let accuarr = [2, 2, 3, 4, 5];
let num = 2.5;
let c = accuarr.length;
console.log(c);
for (let i = 0; i < accuarr.length; i++) {
  if (accuarr[i] < num && num < accuarr[i + 1]) {
    console.log(i);
  }
}
