app.controller('HomePage', ['$scope', 'httpGetQuery', function($scope, httpGetQuery) {
/**---------------------------------------------------SEARCH-INPUT----------------------------------------------------*/
    var scope = this;
    scope.searchForm = {
        input: ''
    };
    scope.filteredList = [];

    $scope.searchDataPromiseGet = httpGetQuery.getData('./assets/js/source/players.json');
    $scope.searchDataPromiseGet.then(function(value) {
        console.log('object is retrieved, reply is:');
        console.log(value);
        scope.filteredList = value;
        scope.bufferedList = value;
    });
/**---------------------------------------------------INPUT-TRIGGER---------------------------------------------------*/
    scope.getPosition = function (str, m, i) {
        return str.split(m, i).join(m).length;
    };
    scope.search = function() {
        var string = scope.searchForm.input,
            stringArr,
            list = scope.bufferedList,
            currentList = [],
            dynamicProp = /\$\$/,
            space = /\s/g,
            objKeys,
            reg,
            stringValue,
            x,
            y,
            n,
            i;

        var internalSearch = function(arg) {
            if(typeof arg === 'string') {
                listLoop:
                    for(i = list.length; i--;) {
                        //console.log(list[i]);
                        objKeys = Object.keys(list[i]);
                        propertiesLoop:
                            for(y = objKeys.length; y--;) {
                                if(!dynamicProp.test(objKeys[y])) { //we check only own properties
                                    //console.log(y);
                                    if(list[i][objKeys[y]] !== null) { //properties with null value are not checked
                                        //console.log(list[i][y]);
                                        stringValue = list[i][objKeys[y]].toString();
                                        reg = new RegExp(arg, "gi");
                                        //console.log(stringValue + ' : ' + string);
                                        if(reg.test(stringValue)) {
                                            //console.log('find it');
                                            //console.log(currentList.length);
                                            if(currentList.length !== 0) {
                                                for(n = currentList.length; n--;) {
                                                    //console.log(currentList[n].id);
                                                    if(currentList[n].id !== list[i].id) {
                                                        if(n === 0) {
                                                            currentList.push(list[i]);
                                                        }
                                                    }else {break}
                                                }
                                            }else {
                                                currentList.push(list[i]);
                                            }

                                            //console.log(currentList);
                                            continue listLoop;
                                        }
                                    }
                                }
                            }

                    }

            }else if(Array.isArray(arg)) {
                //console.log('it is an Array!');
                listLoop:
                    for(i = list.length; i--;) {
                        stringArrLoop:
                            for(x = arg.length; x--;) {
                            //console.log(list[i]);
                                objKeys = Object.keys(list[i]);
                                //console.log(objKeys);
                                propertiesLoop:
                                    for(y = objKeys.length; y--;) {
                                        if(!dynamicProp.test(objKeys[y])) { //we check only own properties
                                            //console.log(y);
                                            if(list[i][objKeys[y]] !== null) { //properties with null value are not checked
                                                //console.log(list[i][y]);
                                                stringValue = list[i][objKeys[y]].toString();

                                                reg = new RegExp(arg[x], "gi");
                                                //console.log(stringValue + ' : ' + arg[x]);
                                                if(reg.test(stringValue)) {
                                                    //console.log('find it in ArrStr');
                                                    //console.log(x);
                                                    if(x === 0) {
                                                        if(currentList.length !== 0) {
                                                            for(n = currentList.length; n--;) {
                                                                //console.log(currentList[n].id);
                                                                if(currentList[n].id !== list[i].id) {
                                                                    if(n === 0) {
                                                                        currentList.push(list[i]);
                                                                    }
                                                                }else {break}
                                                            }
                                                        }else {
                                                            currentList.push(list[i]);
                                                        }
                                                        //console.log(currentList);
                                                        continue listLoop;
                                                    }else {
                                                        continue stringArrLoop; //we check each string in stringArr
                                                    }
                                                    //continue propertiesLoop;
                                                }else {
                                                    if(y === 0) {
                                                        //break stringArrLoop; //all stringArr elements need to match with some of current object property
                                                        continue listLoop;
                                                    }
                                                }
                                            }
                                        }
                                    }

                            }

                    }

            }else {
                console.warn('Incorrect argument type!!!');
            }
        };




        if(space.test(string)) {
            //console.log('with space');
            var spaceNumber = string.match(space).length,
                currentSpacePosition,
                separateItems,
                k,
                p,
                l,
                variants = [];
            switch(spaceNumber) {
                case 1:
                    variants.push(string);
                    separateItems = string.split(' ');
                    for(k = separateItems.length; k--;) {
                        separateItems[k].trim();
                        if(separateItems[k][0] === '"' && separateItems[k][separateItems[k].length - 1] === '"') {
                            separateItems[k] = separateItems[k].substring(1, separateItems[k].length - 2);
                        }
                    }
                    variants.push(separateItems);
                    break;
                case 2:
                    variants.push(string);
                    for(p = spaceNumber; p--;) {
                        stringArr = [];
                        currentSpacePosition = scope.getPosition(string, ' ', p + 1);
                        //console.log(currentSpacePosition);
                        stringArr.push(string.substr(0, currentSpacePosition).trim());
                        stringArr.push(string.substr(currentSpacePosition + 1, string.length - currentSpacePosition).trim());
                        for(k = stringArr.length; k--;) {
                            if(stringArr[k][0] === '"' && stringArr[k][stringArr[k].length - 1] === '"') {
                                stringArr[k] = stringArr[k].substring(1, stringArr[k].length - 2);
                            }
                        }
                        variants.push(stringArr);
                    }
                    separateItems = string.split(' ');
                    for(k = separateItems.length; k--;) {
                        separateItems[k].trim();
                        if(separateItems[k][0] === '"' && separateItems[k][separateItems[k].length - 1] === '"') {
                            separateItems[k] = separateItems[k].substring(1, separateItems[k].length - 2);
                        }
                    }
                    variants.push(separateItems);
                    break;
                default:
                console.warn('Too much searched items!!!');
            }
            //console.log(variants);
            for(l = 0; l < variants.length; l++) {
                //console.log(variants[l]);
                internalSearch(variants[l]);
            }
        }else {
            internalSearch(string);
        }


        scope.filteredList = currentList;
        if(string === '') {
            scope.filteredList = scope.bufferedList;
        }

    };


}]);