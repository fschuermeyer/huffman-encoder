function huffman() {

    this.encode = function (string) {
        var countArray = this.stringToObj(string);
        var sortable = this.objsort(countArray);
        var huffmans = this.startRecusive(sortable);

        var string = this.createString(huffmans, string);

        console.log(huffmans.protype);

        return string;
    }

    this.createString = function (obj, string) {

        var charArray = Array.from(string);
        var newString = '';

        for (let index = 0; index < charArray.length; index++) {
            const element = charArray[index];

            for (let b = 0; b < obj.protype.length; b++) {
                const charCode = obj.protype[b];

                if (element == charCode.name) {
                    newString += charCode.index;
                }

            }
        }

        return newString;

    }

    this.stringToObj = function (string) {

        var charArray = Array.from(string);
        var countChar = this.countChars(charArray);

        return countChar;
    }

    this.countChars = function (charArray) {
        var count = [];

        charArray.forEach(function (i) {
            count[i] = (count[i] || 0) + 1;
        });

        return count;
    }

    this.objsort = function (obj) {
        var sortable = [];
        for (var name in obj) {
            sortable.push([name, obj[name]]);
        }

        sortable.sort(function (a, b) {
            return a[1] - b[1];
        });

        return sortable;
    }


    this.startRecusive = function (sortet) {

        var initialedObject = this.initObject(sortet);

        while (initialedObject.index.length > 1) {
            var NewName = initialedObject.index[0].name + initialedObject.index[1].name;
            var NewCount = initialedObject.index[0].count + initialedObject.index[1].count;

            initialedObject = this.createID(initialedObject, true);
            initialedObject = this.createID(initialedObject, false);

            initialedObject.index[initialedObject.index.length] = {
                name: NewName,
                count: NewCount
            }

            initialedObject = this.clean(initialedObject);

        }

        return initialedObject;

    }

    this.clean = function(obj){
        obj.index.sort(this.compare)

        obj.index = obj.index.filter(function (el) {
            return el != null;
        });

        return obj;
    }

    this.initObject = function (sortet) {
        var obj = {};
        obj.protype = [];
        obj.index = [];

        for (let index = 0; index < sortet.length; index++) {
            const element = sortet[index];

            obj.protype[index] = {
                index: '',
                name: element[0],
                count: element[1]
            }

            obj.index[index] = {
                name: element[0],
                count: element[1]
            }
        }

        return obj;
    }


    this.isDefined = function (element) {
        return typeof element != 'undefined'
    }

    this.createID = function (initialedObject, mode) {

        if (mode) { var B = 1; } else { var B = 0; }

        var Chars = Array.from(initialedObject.index[B].name);

        for (let index = 0; index < initialedObject.protype.length; index++) {
            const element = initialedObject.protype[index];

            for (let x = 0; x < Chars.length; x++) {
                const ele = Chars[x];
                if (element.name == ele) {
                        initialedObject.protype[index].index = B + initialedObject.protype[index].index;
                }
            }
        }

        delete initialedObject.index[B];
        return initialedObject;
    }

    this.compare = function(a,b) {
        if (a.count < b.count)
          return -1;
        if (a.count > b.count)
          return 1;
        return 0;
      }

}


