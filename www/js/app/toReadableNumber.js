define(function(){
  function toReadableNumber(number) {
    var underThousand = number%1000;
    return (number - underThousand)/1000 + '萬' + underThousand;
  }
  return toReadableNumber;
});