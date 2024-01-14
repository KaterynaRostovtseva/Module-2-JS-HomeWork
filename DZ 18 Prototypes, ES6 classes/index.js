// Store Class

class Store {
    #reducer;
    #state;
    #cbs = [];
  
    constructor(reducer, initialState) {
      this.#reducer = reducer;
      this.#state = initialState;
    }
  
    getState() {
      return this.#state;
    }
  
    subscribe(callback) {
      this.#cbs.push(callback);
      return () => {
        this.#cbs = this.#cbs.filter(cb => cb !== callback);
      };
    }
  
    dispatch(action) {
      this.#state = this.#reducer(this.#state, action);
      this.#cbs.forEach(cb => cb());
    }
};

// Password Class
class Password {
    #inputElement;
    #toggleElement;

    constructor(parent, open) {
        this.#inputElement = document.createElement('input');
        this.#toggleElement = document.createElement('input');

        this.#inputElement.type = 'password';
        this.#toggleElement.type = 'checkbox';

        this.#inputElement.type = open ? 'text' : 'password';

        parent.appendChild(this.#inputElement);
        parent.appendChild(this.#toggleElement);

        this.#toggleElement.addEventListener('change', () => {
            this.setOpen(this.#toggleElement.checked);
        });

        this.#inputElement.addEventListener('input', () => {
            if (this.onChange) {
                this.onChange(this.#inputElement.value);
            }
        });
    }

    setValue(value) {
        this.#inputElement.value = value;
        if (this.onChange) {
            this.onChange(value);
        }
    }

    getValue() {
        return this.#inputElement.value;
    }

    setOpen(isOpen) {
        this.#inputElement.type = isOpen ? 'text' : 'password';
        this.#toggleElement.checked = isOpen;
        if (this.onOpenChange) {
            this.onOpenChange(isOpen);
        }
    }

    getOpen() {
        return this.#inputElement.type === 'text';
    }

  
}
let p = new Password(document.body, true);
console.log(p) 


// // StoreThunk Class

class StoreThunk extends Store {
    constructor(reducer, initialState) {
      super(reducer, initialState);
    }
  
    dispatch(action) {
      if (typeof action === 'function') {
        action(this.dispatch.bind(this), this.getState.bind(this));
      } else {
        super.dispatch(action);
      }
    }
};

const storeThunk = new StoreThunk(reducer, initialState);


// RGB Class

class RGB {
    #r;
    #g;
    #b;
  
    constructor(r, g, b) {
      this.#r = r;
      this.#g = g;
      this.#b = b;
    }
  
    get r() {
      return this.#r;
    }
  
    set r(value) {
      this.validateColor(value);
      this.#r =parseInt(value);
    }
  
    get g() {
      return this.#g;
    }
  
    set g(value) {
      this.validateColor(value);
      this.#g = parseInt(value);
    }
  
    get b() {
      return this.#b;
    }
  
    set b(value) {
      this.validateColor(value);
      this.#b = parseInt(value);
    }
  
    get rgb() {
      return `rgb(${this.#r},${this.#g},${this.#b})`;
    }
  
    set rgb(value) {
      const match = value.match(/^(rgb)?\(?([01]?\d\d?|2[0-4]\d|25[0-5])\W+([01]?\d\d?|2[0-4]\d|25[0-5])\W+([01]?\d\d?|2[0-4]\d|25[0-5])\)?$/);
      if (!match) {
        throw new SyntaxError('Недійсний синтаксис RGB');
      }
  
      this.#r = Number(match[2]);
      this.#g = Number(match[3]);
      this.#b =Number(match[4]);
    }
  
    get hex() {
      return `#${this.componentToHex(this.#r)}${this.componentToHex(this.#g)}${this.componentToHex(this.#b)}`;
    }
  
    set hex(value) {
      const match = value.match(/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
      if (!match) {
        throw new SyntaxError('Недійсний синтаксис HEX');
      }
  
      this.#r = Number(match[1], 16);
      this.#g = Number(match[2], 16);
      this.#b = Number(match[3], 16);
    }
  
    validateColor(value) {
      const intValue = Number(value);
  
      if (isNaN(intValue) || intValue < 0 || intValue > 255) {
        throw new RangeError('Значення кольору має бути цілим числом від 0 до 255');
        
      }
     
    }
  
    componentToHex(c) {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }
  }
  

// // Приклад використання
const rgb = new RGB 
rgb.r = 15
rgb.g = 128
rgb.b = 192
console.log(rgb.hex) //#0F80C0
console.log(rgb.rgb) //rgb(15,128,192)
rgb.rgb = 'rgb(100, 90, 50)'
console.log(rgb.r, rgb.g, rgb.b) //100, 90, 50
rgb.hex = '#203040'
console.log(rgb.rgb) //rgb(32, 48, 64)
rgb.hex = 'діч' //SyntaxError
rgb.r   = 1000   //RangeError

// RGBA Class

class RGBA extends RGB {
    #a;
  
    constructor(r, g, b, a) {
      super(r, g, b);
      this.a = a;
    }
  
    get a() {
      return this.#a;
    }
  
    set a(value) {
      if (typeof value !== 'number' || isNaN(value) || value < 0 || value > 1) {
        throw new RangeError('Значення альфа має бути числом від 0 до 1');
      }
      this.#a = value;
    }
  
    get hex() {
      return `${super.hex}${this.componentToHex(Math.round(this.#a * 255))}`;
    }
  
    set hex(value) {
      const match = value.match(/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/);
      if (match) {
        super.hex = `#${match[1]}${match[2]}${match[3]}`;
        this.#a = match[4] ? parseInt(match[4], 16) / 255 : 1;
      } else {
        throw new SyntaxError('Недійсний синтаксис HEX');
      }
    }
  
    get rgba() {
      return `rgba(${this.r},${this.g},${this.b},${this.#a})`;
    }
  
    set rgba(value) {
      const match = value.match(/^rgba\((\d+),(\d+),(\d+),([01](\.\d+)?)\)$/);
      if (match) {
        super.rgb = `rgb(${match[1]},${match[2]},${match[3]})`;
        this.#a = parseFloat(match[4]);
      } else {
        throw new SyntaxError('Недійсний синтаксис RGBA');
      }
    }
  
    set color(value) {
      if (value.startsWith('#')) {
        this.hex = value;
      } else if (value.startsWith('rgba')) {
        this.rgba = value;
      } else if (value.startsWith('rgb')) {
        this.rgb = value;
      } else {
        throw new SyntaxError('Недійсний синтаксис кольору');
      }
    }
  }
  

// Приклад використання
const rgba = new RGBA
rgba.hex = '#80808080';
console.log(rgba.a) //0.5
console.log(rgba.rgba) //rgba(128,128,128,0.5)
rgba.r = 192
rgba.a = 0.25
console.log(rgba.hex)  //#C0808040
rgba.color = 'rgba(1,2,3,0.70)'
rgba.b    *= 10
console.log(rgba.hex)  //#01021EB3

