/* inspired by Dungeons and Developers */

(function ($, ko) {

    //Private utilities
    function namespace(namespaceString) {
        var parts = namespaceString.split('.'),
            parent = window,
            currentPart = '';

        for (var i = 0, length = parts.length; i < length; i++) {
            currentPart = parts[i];
            parent[currentPart] = parent[currentPart] || {};
            parent = parent[currentPart];
        }

        return parent;
    }

    function prettyJoin(array) {
        if (array.length > 2) array = [array.slice(0, array.length - 1).join(', '), array[array.length - 1]];
        return array.join(' or ');
    }

    //Custom binding handlers
    ko.bindingHandlers.rightClick = {
        init: function (element, valueAccessor) {
            $(element).on('mousedown', function (event) {
                if (event.which == 3) valueAccessor()();
            }).on('contextmenu', function (event) {
                event.preventDefault();
            });
        }
    };

    ko.bindingHandlers.hoverToggle = {
        update: function(element, valueAccessor) {
            var css = valueAccessor();
            var skill = element.textContent;
            var elem = $( ".skill:contains("+skill+")" );

            ko.utils.registerEventHandler(element, "mouseover", function() {
                ko.utils.toggleDomNodeCssClass(elem[0], ko.utils.unwrapObservable("grow"), true);
            });

            ko.utils.registerEventHandler(element, "mouseout", function() {
                ko.utils.toggleDomNodeCssClass(elem[0], ko.utils.unwrapObservable("grow"), false);
            });
        }
    };

  //  ko.bindingHandlers['css2'] = ko.bindingHandlers.css;
    //hex.talents namespace
    (function (ns) {

        //VM for the entire UI
        var Calculator = ns.Calculator = function (_e) {
            var e = _e || {};
            var self = {};
            //constants for hash generation
            var asciiOffset = 96; //64 for caps, 96 for lower
            var hashDelimeter = '_';
            var Base64 = {
                _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                encode: function (e) {
                    var t = "";
                    var n, r, i, s, o, u, a;
                    var f = 0;
                    e = Base64._utf8_encode(e);
                    while (f < e.length) {
                        n = e.charCodeAt(f++);
                        r = e.charCodeAt(f++);
                        i = e.charCodeAt(f++);
                        s = n >> 2;
                        o = (n & 3) << 4 | r >> 4;
                        u = (r & 15) << 2 | i >> 6;
                        a = i & 63;
                        if (isNaN(r)) {
                            u = a = 64
                        } else if (isNaN(i)) {
                            a = 64
                        }
                        t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
                    }
                    return t
                },
                decode: function (e) {
                    var t = "";
                    var n, r, i;
                    var s, o, u, a;
                    var f = 0;
                    e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                    while (f < e.length) {
                        s = this._keyStr.indexOf(e.charAt(f++));
                        o = this._keyStr.indexOf(e.charAt(f++));
                        u = this._keyStr.indexOf(e.charAt(f++));
                        a = this._keyStr.indexOf(e.charAt(f++));
                        n = s << 2 | o >> 4;
                        r = (o & 15) << 4 | u >> 2;
                        i = (u & 3) << 6 | a;
                        t = t + String.fromCharCode(n);
                        if (u != 64) {
                            t = t + String.fromCharCode(r)
                        }
                        if (a != 64) {
                            t = t + String.fromCharCode(i)
                        }
                    }
                    t = Base64._utf8_decode(t);
                    return t
                },
                _utf8_encode: function (e) {
                    e = e.replace(/\r\n/g, "\n");
                    var t = "";
                    for (var n = 0; n < e.length; n++) {
                        var r = e.charCodeAt(n);
                        if (r < 128) {
                            t += String.fromCharCode(r)
                        } else if (r > 127 && r < 2048) {
                            t += String.fromCharCode(r >> 6 | 192);
                            t += String.fromCharCode(r & 63 | 128)
                        } else {
                            t += String.fromCharCode(r >> 12 | 224);
                            t += String.fromCharCode(r >> 6 & 63 | 128);
                            t += String.fromCharCode(r & 63 | 128)
                        }
                    }
                    return t
                },
                _utf8_decode: function (e) {
                    var t = "";
                    var n = 0;
                    var r = c1 = c2 = 0;
                    while (n < e.length) {
                        r = e.charCodeAt(n);
                        if (r < 128) {
                            t += String.fromCharCode(r);
                            n++
                        } else if (r > 191 && r < 224) {
                            c2 = e.charCodeAt(n + 1);
                            t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                            n += 2
                        } else {
                            c2 = e.charCodeAt(n + 1);
                            c3 = e.charCodeAt(n + 2);
                            t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                            n += 3
                        }
                    }
                    return t
                }
            }

            //Intro vs Talent Tree UI state
            self.isOpen = ko.observable(true);
            self.open = function () {
                self.isOpen(true);
            };
            self.close = function () {
                self.isOpen(false);
            };

            self.toggle = function () {
                self.isOpen(!self.isOpen());
            };

            self.maxPoints = ko.observable(8);
            self.stats = ko.observableArray([]);
            self.skills = ko.observableArray([]);
            self.talentsList = ko.observableArray([]);
            self.traitsList = ko.observableArray([]);
            self.combosList = ko.observableArray([]);
            self.selectedRace = ko.observable("");
            self.selectedClass = ko.observable("");

            //Race list
            self.races = ko.observableArray(ko.utils.arrayMap(e.races, function (item) {
                return new Race(item, e.racial[item].traits);
            }));
            //Class list
            self.classes = ko.observableArray(ko.utils.arrayMap(e.classes, function (item) {
                return new Class(item, e.talents[item]);
            }));

            self.pointsLeft = ko.computed(function () {
                var pointsleft = self.maxPoints();
                ko.utils.arrayForEach(self.skills(), function (skill) {
                    pointsleft -= skill.enabled() ? (skill.cost() || 0) : 0;
                });
                return pointsleft;// + 1;
            });

            function getSkillById(id) {
                return ko.utils.arrayFirst(self.skills(), function (item) {
                    return item.id == id;
                });
            }

            function setupTalentTree(selectedRace, selectedClass) {

                if (!selectedClass || !selectedRace) {
                    return;
                    //no reset until both are selected
                }
                self.skills.removeAll();
                self.talentsList.removeAll();
                self.traitsList.removeAll();
                self.combosList.removeAll();

                //add class specific
                ko.utils.arrayForEach(e.talents[selectedClass].skills, function (item) {
                    self.skills.push(new Skill(item, "classtalent", e.learnTemplate, self));
                });

                //add race specific
                ko.utils.arrayForEach(e.racial[selectedRace].traits, function (item) {
                    var skill = new Skill(item, "racetrait", e.learnTemplate, self);
                    self.skills.push(skill);
                  //  skill.enabled(true);
                });

                //add combos
                ko.utils.arrayForEach(e.racial[selectedRace].combo[selectedClass], function (item) {
                    self.skills.push(new Skill(item, "racecombo", e.learnTemplate, self));
                });

                //Wire up dependency references
                ko.utils.arrayForEach(e.talents[selectedClass].skills, function (item) {
                    var dependent = getSkillById(item.id);

                    if (item.dependsOn) {
                        if (!dependent) {
                            console.log("Skill with id: " + item.id + " was not initialized");
                            return;
                        }
                        ko.utils.arrayForEach(item.dependsOn, function (dependencyId) {
                            var dependency = getSkillById(dependencyId);
                            dependent.dependencies.push(dependency);
                            dependency.dependents.push(dependent);
                        });
                    }
                });

                //not sure if needed
                //self.talents = ko.utils.arrayMap(self.skills(), function(skill){
                //    if (skill.type == "classtalent")
                //        return skill;
                //});

                ko.utils.arrayForEach(self.skills(), function (skill) {
                    if (skill.type == "classtalent")
                        self.talentsList.push(skill);

                    if (skill.type == "racetrait"){
                        self.traitsList.push(skill);
                    }

                    if (skill.type == "racecombo")
                        self.combosList.push(skill);

                    //reset applied modifiers - fix the problem with racials modifiers not being applied
                    self.maxPoints(8);
                    skill.appliedModifiers = ko.observableArray([])
                });
                //TODO: if there are mandatory dependencies, create a new array with those

                self.stats.removeAll();
                for (var statName in e.talents[selectedClass].defaultStats) {
                    self.stats.push({
                        title: statName,
                        value: ko.observable(e.talents[selectedClass].defaultStats[statName])
                    });
                }
            }

            self.applyModifiers = ko.computed(function(){
                ko.utils.arrayForEach(self.skills(), function (skill) {
                    if(skill.hasModifier()){
                        //modify starting stats
                        ko.utils.arrayForEach(self.stats(), function (stat){
                            var currentStat = stat.title,
                                appliedModifier = skill.appliedModifiers().indexOf(currentStat);

                            //if enabled and dont have applied
                            if(skill.isEnabled() && appliedModifier == -1){
                                //apply modifier
                                if(skill.modifier()[currentStat]){
                                    //UPDATE Main Stats
                                    stat.value(stat.value() + skill.modifier()[currentStat]);
                                    skill.appliedModifiers.push(currentStat);
                                }
                            }
                            if(!skill.isEnabled() && appliedModifier > -1){
                                //remove modifier
                                stat.value(stat.value() - skill.modifier()[currentStat]);
                                skill.appliedModifiers.splice(appliedModifier,1);
                            }
                        });

                        //modify available talent points
                        var currentStat = "Talent points",
                            appliedModifier = skill.appliedModifiers().indexOf(currentStat);
                        //if enabled and dont have applied
                        if(skill.isEnabled() && appliedModifier == -1){
                            //apply modifier
                            if(skill.modifier()[currentStat]){
                                //UPDATE Main Stats
                                self.maxPoints(self.maxPoints() + skill.modifier()[currentStat]);
                                //stat.value(stat.value() + skill.modifier()[currentStat]);
                                skill.appliedModifiers.push(currentStat);
                            }
                        }
                        if(!skill.isEnabled() && appliedModifier > -1){
                            //remove modifier
                            self.maxPoints(self.maxPoints() - skill.modifier()[currentStat]);
                            //stat.value(stat.value() - skill.modifier()[currentStat]);
                            skill.appliedModifiers.splice(appliedModifier,1);
                        }
                    }
                });
            });

            self.showSelectionText = ko.observable(true);

            self.selectedCombo = ko.computed(function () {
                var selectedRace = self.selectedRace(), selectedClass = self.selectedClass();

                if (selectedRace && selectedClass) {
                    self.showSelectionText(false);
                    self.open();
                    setupTalentTree(selectedRace, selectedClass);

                    return true;
                }
            });

            self.avatarName = ko.computed(function () {
                return self.selectedRace() + " " + self.selectedClass();
            });

            //Utility functions
            self.reset = function () {
                ko.utils.arrayForEach(self.skills(), function (skill) {
                    if (!skill.default)
                        skill.enabled(false);
                   // skill.appliedModifiers.removeAll()
                });
            };

            //Hash functions
            self.hash = ko.computed(function () {
                var a = [], classRace = (self.selectedRace() || "") + "." + (self.selectedClass() || "");
                //compile a flat list of skill ids and values
                ko.utils.arrayForEach(self.skills(), function (skill) {
                    if (skill.enabled()) {
                        a.push(String.fromCharCode(skill.id + asciiOffset)); //convert skill id to letter of the alphabet
                    }
                });
                var string = [classRace, a.join('')].join(hashDelimeter);
                string = string != "._" ? string : "";

                //  var encodedString = Base64.encode(string);
                return Base64.encode(string);
            });
            //Update the skill tree based on a new hash
            function useHash(hash) {
                if (hash) {
                    doUpdateHash = false;
                    self.reset();
                    hash = Base64.decode(hash);

                    var hashParts = hash.split(hashDelimeter);
                    //if(hashParts[2]) self.portrait(Number(hashParts[2])); //use the segment after the second delimeter as the portrait index
                    //if(hashParts[3]) self.avatarName(hashParts[3]); //use the segment after the third delimeter as the avatar name

                    var classRace = hashParts[0].split(".");

                    //classRace;
                    if (!classRace[0] || !classRace[1]) {
                        // console.log("no class-race combo");
                        doUpdateHash = true;
                        return;
                    }

                    if (classRace[0])
                        self.selectedRace(classRace[0]);
                    if (classRace[1])
                        self.selectedClass(classRace[1]);

                    var s = hashParts[1], //use the segment after the first delimeter as the skill hash
                        pairs = [];

                    //break the hash back down into skill/value pairs, one character at a time
                    var hashCharacters = s.split('');
                    for (var i = 0; i < hashCharacters.length; i++) {
                        if (!Number(hashCharacters[i])) { //if the current character is not a number,
                            var skill = getSkillById(hashCharacters[i].charCodeAt(0) - asciiOffset); //convert the character to a skill id and look it up
                            if (skill) {
                                var points = Number(hashCharacters[i + 1]) || true; //default to 1 point if the number is not specified next
                                pairs.push({
                                    skill: skill
                                    , enabled: points
                                })
                            }
                        }
                    }

                    //cycle through the whole list, adding points where possible, until the list is depleted
                    var pointsWereAllocated = true; //flag
                    while (pointsWereAllocated) {
                        pointsWereAllocated = false; //assume the list is depleted by default
                        ko.utils.arrayForEach(pairs, function (pair) {
                            if (!pair.wasAllocated && pair.skill.canBeEnabled()) { //only add points once, and only where possible
                                pair.skill.enabled(true);
                                pair.wasAllocated = true; //don't add this one again
                                pointsWereAllocated = true;
                            }
                        });
                    }

                    doUpdateHash = true;
                }
            }

            //Hash throttling

            //update the address bar when the hash changes
            function useLastHash() {
                useHash(lastHash);
            }

            function updateHash(s) {
                window.location.hash = s || newHash;

                //if(newHash == "RHdhcmYuTWFnZV9hYmZna2xtbm9wcQ=="){
                //    alert ("RHdhcmYuTWFnZV9hYm9wcQ==")
                //}
            }

            var lastHash, useHash_timeout, newHash, updateHash_timeout, doUpdateHash = true;
            self.useHash = function (hash) {
                lastHash = hash;
                clearTimeout(useHash_timeout);
                useHash_timeout = setTimeout(useLastHash, 50);
            };

            self.hash.subscribe(function (newValue) {
                if (doUpdateHash) {
                    newHash = newValue;
                    clearTimeout(updateHash_timeout);
                    updateHash_timeout = setTimeout(updateHash, 50);
                }
            });

            window.onhashchange = function () {
                self.useHash(window.location.hash.substr(1));
            };

            //Launch
            var currentHash = window.location.hash.substr(1);
            self.isOpen(currentHash != ''); //If there is a hash, open the skill tree by default
            self.useHash(currentHash);

            return self;
        };

        //VM for races
        var Race = ns.Race = function (_e, traits) {
            var e = _e || {};
            var self = {};

            self.name = e;
            self.imagePath = ko.observable("img/icons/" + self.name + ".png");

            self.hasNoData = ko.computed(function () {
                return !traits.length;
            });

            return self;
        };

        //VM for classes
        var Class = ns.Class = function (_e, talents) {
            var e = _e || {};
            var self = {};

            self.name = e;
            self.imagePath = ko.observable("img/icons/" + self.name + ".png");


            self.hasNoData = ko.computed(function () {
                return !talents.skills.length;
            });

            return self;
        };

        //VM for individual skills
        var Skill = ns.Skill = function (_e, skilltype, learnTemplate, calculator) {
            var e = _e || {};
            var self = {};

            //Basic properties
            self.id = e.id || 0;
            self.title = e.title || 'Unknown Skill';
            self.description = getRuleIcons(e.description);
            self.extraDescription = e.extraDescription;
            self.cost = ko.observable(e.cost);
            self.type = skilltype;
            self.icon = e.icon || self.title.replace(/['\s:-]/g, "");//e.icon || "";
            self.modifier = ko.observable(e.modifier || false);
            self.appliedModifiers = ko.observableArray([]);
            //self.appliedModifiers1 = ko.observable({});

            //NOT SURE IF ITS OK - MIGHT HAVE SOME MEM LEEKS
            self.calculator = calculator;

            //position
            self.position = e.position || "";
            self.default = e.default || false;
            //self.default = false;
            //self.enabled = ko.observable(false);//ko.observable(e.default || false);
            self.enabled = ko.observable(e.default || false);

            self.links = ko.utils.arrayMap(e.links, function (item) {
                return new Link(item);
            });
            self.dependencies = ko.observableArray([]);
            self.dependents = ko.observableArray([]);
            self.noLines = ko.observableArray(e.noLine);
            self.stats = e.stats || [];
            self.rankDescriptions = e.rankDescriptions || [];
            //self.talents = e.talents || [];

            //Computed values
            self.hasDependencies = ko.computed(function () {
                return self.dependencies().length > 0;
            });

            //checked when trying to enable a talent or for displaying in help
            self.dependenciesFulfilled = ko.computed(function () {
                var result = self.dependencies().length ? false : true;
                ko.utils.arrayForEach(self.dependencies(), function (item) {
                    if (item.enabled()) result = true;
                });
                return result;
            });

            self.dependenciesFulfilledMandatory = ko.computed(function () {
                var result = self.dependencies().length ? false : true;
                ko.utils.arrayForEach(self.dependencies(), function (item) {
                    if (!item.enabled()) result = false;
                });
                return result;
            });

            self.dependencyEnabled = ko.computed(function () {
                var result = self.dependencies().length ? false : true;
                ko.utils.arrayForEach(self.dependencies(), function (item) {
                    if (item.enabled()) result = true;
                });
                return result;
            });

            self.hasModifier = ko.computed(function(){
                return self.modifier() != false;
            });

            self.hasModifierApplied = ko.computed(function(){
                return self.appliedModifiers().length > 0;
            });

            self.isTalent = ko.computed(function(){
                return self.type == "classtalent"
            });

            self.isTrait = ko.computed(function(){
                return self.type == "racetrait"
            });

            self.isCombo = ko.computed(function(){
                return self.type == "racecombo"
            });

            self.getType = ko.computed(function(){
                var cost = self.cost() ? self.cost() + "pt" : "Free", frame = "Frame_";
                if(self.type == "classtalent"){
                    if(self.position == "talent1")
                        return frame + "ChargePower";
                    else
                        return frame + cost;
                }
                if(self.type == "racetrait"){
                    return frame + "RaceTalent";
                }
                if(self.type == "racecombo"){
                    return frame + "RaceCombo";
                }
                return "";
            });

            self.getIcon = ko.computed(function(){
                return "url('img/talent-icons/" + self.icon + ".png')";
            });

            self.dependentsUsed = ko.computed(function () {
                var result = false;
                ko.utils.arrayForEach(self.dependents(), function (item) {
                    if (item.enabled()) {
                        result = true;
                        ko.utils.arrayForEach(item.dependencies(), function (dependency) {
                            if (dependency.enabled())
                                result = false;
                        })
                    }
                });
                return result;
            });

            self.getDir = function (val, elem) {
                var result, dependentId = self.id, dependencyId = elem.id;
                var dependentSkill = $(".skill[data-skill-id=" + dependentId + "]");
                var dependencySkill = $(".skill[data-skill-id=" + dependencyId + "]");
                var dependencyArrow = $(".skill-dependency[data-dependency-id=" + dependencyId + "]");

                var dependantPositionHor = dependentSkill.offset().left;
                var dependencyPositionHor = dependencySkill.offset().left;

                var dependantPositionVertical = dependentSkill.offset().top;
                var dependencyPositionVertical = dependencySkill.offset().top;

                var Horizontal = dependencyPositionHor - dependantPositionHor == 0 ? "" : dependencyPositionHor - dependantPositionHor < 0 ? "left" : "right";

                result = Horizontal ? Horizontal : dependencyPositionVertical - dependantPositionVertical == 0 ? "none1" : dependencyPositionVertical - dependantPositionVertical < 0 ? "up" : "down";

                ko.utils.arrayForEach(dependencyArrow, function (arrow) {
                    var alreadyDefined = $(arrow).attr("data-dependent");
                    if (typeof alreadyDefined == typeof undefined || alreadyDefined == false) {
                        if (!self.noLines().length || self.noLines().indexOf(dependencyId) == -1) {
                            $(arrow).attr("data-dependent", self.id).attr("direction", result);
                        }
                        else {
                            console.log("found no line " + dependencyId)
                        }

                    }
                });
            };

            self.isEnabled = ko.computed(function () {
                return self.enabled();
            });

            //my edit
            self.canBeEnabled = ko.computed(function () {
                return self.dependenciesFulfilled() && !self.enabled() && (self.calculator.pointsLeft() - self.cost()) >= 0;
            });
            self.canBeDisabled = ko.computed(function () { //replace canRemovePoints
                return (!self.dependentsUsed() && self.enabled() && !self.default);

            });

            //Summarize what the user needs to unlock this skill (if anything)
            self.helpMessage = ko.computed(function () {
                if (!self.dependenciesFulfilled()) {
                    var s = [];
                    ko.utils.arrayForEach(self.dependencies(), function (item) {
                        if (!item.enabled()) s.push(item.title);
                    });
                    return (learnTemplate || 'Learn {n} to unlock.').replace('{n}', prettyJoin(s));
                }
                if((self.calculator.pointsLeft()  - self.cost()) < 0 && !self.enabled()){
                    return ("Can't learn this. Not enough talent points.")
                }
                return '';
            });
            //self.talentSummary = ko.computed(function(){
            //	return self.talents.join(', ');
            //});

            self.extraDescription = ko.computed(function () {
                return self.extraDescription;
            });

            //Methods
            self.enableTalent = function () {
                if (self.canBeEnabled())
                    self.enabled(true);
            };

            self.disableTalent = function () {
                if (self.canBeDisabled())
                    self.enabled(false);
            };

            function getRuleIcons(description){
                description = description.replace("[1SHOT]", "<img src='img/icons/cards/1shot.png'>");
                description = description.replace("->", "<img src='img/icons/cards/arrowr.png'>");
                description = description.replace("[BASIC]", "<img src='img/icons/cards/basic.png'>");
                description = description.replace("[ATK]", "<img src='img/icons/cards/attack.png'>");
                description = description.replace("[DEF]", "<img src='img/icons/cards/defense.png'>");
                description = description.replace("[WILD]", "<img src='img/icons/shards/w.png'>");
                description = description.replace("[1SHOT]", "<img src='img/icons/cards/1shot.png'>");

                description = description.replace(/\[(\d)\]/, "<img src='img/icons/cards/cost/$1.png'>");
                description = description.replace(/\[(\d+)\/(\d+)\]/, "<img src='img/icons/cards/resources/$1-$2.png'>");

                return description;
            }

            return self;
        };
        //VM for a simple hyperlink
        var Link = ns.Link = function (_e) {
            var e = _e || {};
            var self = {};

            //Basic properties
            self.label = e.label || (e.url || 'Learn more');
            self.url = e.url || 'javascript:void(0)';

            return self;
        }
    })(namespace('hex.talents'));

})(window.jQuery, window.ko);