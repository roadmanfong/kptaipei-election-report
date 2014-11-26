define(function(){
  function toReadableNumber(number) {
    var underThousand = number%10000;
    var beyoundThounsand = (number - underThousand)/10000;
    underThousand = underThousand < 0 ? 0 : underThousand;
    return  (beyoundThounsand ? beyoundThounsand + '萬' : '') + underThousand + '票';
  }
  return toReadableNumber;
});