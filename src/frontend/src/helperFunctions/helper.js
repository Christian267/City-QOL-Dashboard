export const separateCamelCaseWord = (word) => {
    var newWords = '';
    for (let ch of word) {
        if (ch === ch.toUpperCase()) {
            newWords += ' ';
        }
        newWords += ch;
    }
    newWords[0].toUpperCase();
    return newWords[0].toUpperCase() + newWords.substring(1);
}