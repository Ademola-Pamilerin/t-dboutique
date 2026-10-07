const BATCH_THREE_DATA = `T&D Collections|45000|12&14
Elly group|45000|10&12
T&D Collections|45000|Size 14
Yake|85000|Size: turkey 36
T&D Collections|55000|UK 8&10
Lasagrada|65000|Turkey
Lasagrada|65000|Turkey size 36, UK 10
Rafaela|45000|Size 12
T&D Collections|85000|14&16
T&D Collections|95000|12&14
T&D Collections|95000|Size 12&14
Jilani|45000|Turkey size 52
Jilani|45000|Turkey
Hatunca|65000|Uk size 18
Kasper|110000|Size 18
Cortelle|55000|Turkey 42
Nesly|55000|Turkey 44
A.C.R fashion|42500|Turkey 42
T&D Collections|45000|UK 8
Iremoda|65000|Turkey 44
Hatunca|55000|Uk size 14
Hatunca|55000|Uk
T&D collections|65000|Size 14&16
Aron|45000|Turkey 42
T&D Collections|65000|12,14&16
T&D Collections|55000|Uk 16
Hatunca|55000|Uk
T&D Collections|45000|UK
Mode Class|30000|Size 36.
Miss Esta|15000|Turkey 44
Rafaella|35000|Uk 10
Hatunca|55000|Uk size 16
Lasagrada|65000|Turkey 38
T&D collections|65000|Size 14&16
T&D Collections|88000|Size 12
Nana|45000|Size Uk 12&14
Airport|45000|Turkey 44
T&D Collections|28000|Size 10&12
Elly Group|38000|Turkey Size 42
T&D Collections|55000|Size 12&14
T&D Collections|65000|Free size
T&D Collections|55000|XL
T&D Collections|85000|L
T&D Collections|85000|XL
T&D Collections|85000|L
Christian Dior|85000|XL
Givenchy Paris|85000|XXL
Zara|85000|L
Sky|75000|XL
Norm|75000|Turkey 36
Sky|55000|XL
Aomei|45000|XL
T&D Collections|65000|Size 12&14
T&D Collections|85000|Uk 14&16
T&D Collections|75000|Uk 14,16&18
T&D Collections|55000|10,12,14&16
Love bonito|55000|Free size
Christian|85000|XL
T&D Collections|75000|Uk
T&D Collections|75000|Size 14&16`.split('\n');

export const BATCH_THREE_ITEMS = BATCH_THREE_DATA.map((row) => {
  const [brand, rawPrice, size] = row.split('|');
  const numericPrice = Number(rawPrice);
  return [brand, numericPrice ? numericPrice.toLocaleString('en-US') : 'Price on request', numericPrice, size] as const;
});
