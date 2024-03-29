var wordlist_url = 'en-wordlist.txt';

function pw_gen(callback, numwords, digits, caps, wordlength) {
    //fail cases
    if (typeof(numwords) === 'undefined') {
        numwords = 4;
    }
    if (typeof(wordlength) === 'undefined'){
      wordlength = 4;
    }
    if (typeof(digits) === 'undefined') {
        digits = false;
    }
    if (typeof(caps) === 'undefined') {
        caps = false;
    }
    if (typeof(wordlist) === 'undefined') {
        $.get(wordlist_url, function(txt) {
            wordlist = txt.split('\n');
            pw_gen(callback, numwords,digits,caps, wordlength);
        });
        return;
    }


    //starting word
    var words = [];

    var hash = new Uint32Array(numwords);

    if (window.crypto && window.crypto.getRandomValues) {
        window.crypto.getRandomValues(hash);
    }

    for (var i = 0; i < numwords; i++) {
        var index = 0;

        if (hash[i] > 0) {
            index = hash[i];

        } else {
            index = Math.floor(Math.random() * 0x100000000);
        }
        words.push(wordlist[index % wordlist.length]);
    }


    if (caps) {
        var index = Math.floor(Math.random() * 0x100000000) % words.length;
        words[index] = words[index].charAt(0).toUpperCase() + words[index].slice(1);
    }


      if(digits){
         words.splice(Math.floor(Math.random() * 0x100000000) % (numwords + 1), 0, Math.floor(Math.random() * 0x100000000 % 10000));
      }



    if (typeof(callback) === 'function') {
        callback.call(this, words);
    }
}
