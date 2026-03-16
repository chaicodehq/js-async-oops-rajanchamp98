/**
 * 🥟 Ramu ka Samosa Cart - `this` Keyword Basics
 *
 * Ramu bhai ka samosa cart hai jo alag alag jagah ghoomta hai. Tumhe ek
 * samosa cart ka object banana hai jisme `this` keyword ka sahi use ho.
 * `this` se cart apni properties ko access karta hai — owner, location,
 * menu, aur sales sab `this` ke through milta hai.
 *
 * Function: createSamosaCart(ownerName, location)
 *
 * Returns an object with these properties:
 *   - owner: ownerName
 *   - location: location
 *   - menu: { samosa: 15, jalebi: 20, kachori: 25 }
 *   - sales: [] (empty array)
 *
 * And these methods (sab `this` use karte hain):
 *
 *   - sellItem(itemName, quantity)
 *     Validates ki item this.menu mein hai ya nahi.
 *     Agar hai: push { item: itemName, quantity, total: price * quantity } to this.sales.
 *     Returns total price.
 *     Agar item invalid hai ya quantity <= 0: return -1
 *
 *   - getDailySales()
 *     Returns sum of all totals in this.sales.
 *     Agar koi sale nahi hai, return 0.
 *
 *   - getPopularItem()
 *     Returns item name jiska total quantity sabse zyada hai across all sales.
 *     Agar koi sales nahi hain, return null.
 *
 *   - moveTo(newLocation)
 *     Updates this.location to newLocation.
 *     Returns string: "${this.owner} ka cart ab ${newLocation} pe hai!"
 *
 *   - resetDay()
 *     Clears this.sales array (empty kar do).
 *     Returns string: "${this.owner} ka naya din shuru!"
 *
 * Function: demonstrateThisLoss(cart)
 *   Takes a samosa cart object. Extracts the sellItem method WITHOUT binding
 *   (destructure ya variable mein store karo). Returns the unbound function
 *   reference. Yeh dikhata hai ki `this` context lose ho jata hai jab method
 *   ko object se alag karte ho.
 *
 * Function: fixWithBind(cart)
 *   Takes a samosa cart object. Returns cart.sellItem bound to cart using
 *   Function.prototype.bind(). Ab `this` hamesha cart ko refer karega.
 *
 * Rules:
 *   - sellItem mein itemName case-sensitive hai
 *   - quantity must be a positive number (> 0)
 *   - All methods must use `this` to access object properties
 *   - getDailySales returns 0 for empty sales, not undefined
 *   - getPopularItem returns null for no sales, not undefined
 *
 * @param {string} ownerName - Cart owner ka naam
 * @param {string} location - Cart ki current jagah
 * @returns {object} Samosa cart object with properties and methods
 *
 * @example
 *   const cart = createSamosaCart("Ramu", "Station Road");
 *   cart.sellItem("samosa", 3);    // => 45
 *   cart.sellItem("jalebi", 2);    // => 40
 *   cart.getDailySales();           // => 85
 *   cart.getPopularItem();          // => "samosa"
 *   cart.moveTo("College Gate");    // => "Ramu ka cart ab College Gate pe hai!"
 *   cart.resetDay();                // => "Ramu ka naya din shuru!"
 *
 * @example
 *   const cart = createSamosaCart("Ramu", "Station");
 *   const lostFn = demonstrateThisLoss(cart); // unbound sellItem function
 *   const boundFn = fixWithBind(cart);         // properly bound sellItem
 */
export function createSamosaCart(ownerName, location) {
  return {
    owner: ownerName,
    location: location,
    menu: { samosa: 15, jalebi: 20, kachori: 25 },
    sales: [],

    sellItem: function (itemName, quantity) {
      if (!this.menu[itemName] || quantity <= 0)
        return -1;
      const itemSold = {
        item: itemName,
        quantity,
        total: this.menu[itemName] * quantity,
      };

      this.sales.push(itemSold);

      return itemSold.total;
    },
    getDailySales:function(){
      if(this.sales.length == 0 ) return 0
      const totalSales=this.sales.reduce((total,current)=>{
        total+=current.total
        return total
      },0)
      return totalSales

    },
    getPopularItem:function(){
      if(this.sales.length==0) return null
      const totalItemSaleCount=this.sales.reduce((itemCount,current)=>{
        itemCount[current.item]=(itemCount[current.item]|| 0) + current.quantity
        return itemCount

      },{})

      let maxItem=null
      let maxQty=0

      for(let item in totalItemSaleCount){
        if(totalItemSaleCount[item]>maxQty){
          maxItem=item
          maxQty=totalItemSaleCount[item]
        }
      }
      return maxItem

    },
    // - moveTo(newLocation)
//  *     Updates this.location to newLocation.
//  *     Returns string: "${this.owner} ka cart ab ${newLocation} pe hai!"
    moveTo:function (newLocation){
      this.location=newLocation
      return `${this.owner} ka cart ab ${newLocation} pe hai!`

    },
//     - resetDay()
//  *     Clears this.sales array (empty kar do).
//  *     Returns string: "${this.owner} ka naya din shuru!"
//  *
    resetDay:function (){
      this.sales=[]
      return `${this.owner} ka naya din shuru!`
    }
  };
}

export function demonstrateThisLoss(cart) {
  // Your code here
  const {sellItem} = cart
  return sellItem
}

export function fixWithBind(cart) {
  // Your code here
  return cart.sellItem.bind(cart)

}


// const samosa1=new createSamosaCart("Rohan","Delhi")
// console.log(samosa1.sellItem("jalebi",6))
// console.log(samosa1.sellItem("samosa",3))
// console.log(samosa1.sellItem("kachori",9))
// console.log(samosa1.getDailySales())
// console.log(samosa1.getPopularItem())
