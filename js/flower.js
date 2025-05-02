export class Flower {
    constructor(rootId) {
      this.root = document.getElementById(rootId);
      if (!this.root) throw new Error(`No element found with id ${rootId}`);
  
      // Extract root origin
      const rootOriginEl = this.root.querySelector("circle");

      
      this.origin = this.#extractOrigin(rootOriginEl);
  
      // Find all child groups (excluding the root itself)
      this.parts = Array.from(this.root.querySelectorAll("g"))
        .filter(g => g.querySelector("circle"))
        .map(g => ({
          el: g,
          origin: this.#extractOrigin(g.querySelector("circle"))
        }));
  
  
        
    }
  
    
  
    #extractOrigin(circleEl) {
      if (!circleEl) return "0 0";
      if (circleEl.hasAttribute("transform")) {
        return circleEl
          .getAttribute("transform")
          .replace("translate(", "")
          .replace(")", "")
          .replace(",", " ");
      }
      if (circleEl.hasAttribute("cx") && circleEl.hasAttribute("cy")) {
        return `${circleEl.getAttribute("cx")} ${circleEl.getAttribute("cy")}`;
      }
      return "0 0";
    }
  
    grow() {
  

   
      gsap.to(this.root,{duration:1,scale:1,
        svgOrigin:this.origin, 
        ease:"power1.easeInOut"});
        
        // Animate each part staggered
        this.parts.forEach((part, i) => {
          
       
  
          gsap.to(part.el,{duration:2+((i+.3)*2),scale:1,
            svgOrigin:part.origin,
            // transformOrigin:part.origin,
            ease:"power1.easeInOut"
          
          });
            
            
          });
        }
        
        hide(){
          gsap.set(this.root,{scale:0,svgOrigin:this.origin})
          
          this.parts.forEach((part, i) => {
       
      
          
          
            gsap.set(part.el,{scale:0.2,svgOrigin:part.origin});
          
    
        });
       

    }

  }


  const fsvg = await fetch("./flowers.svg") 
   const data = await fsvg.text()

   const container = document.querySelector('[data-flowers]')

   container.innerHTML = data


  
  const circles = document.querySelectorAll('circle') 
   circles.forEach(circle => {
    circle.style.fill = 'transparent'
  });
  
  export const FLOWERS = new Map()
  const flowers = document.querySelectorAll('.flowers svg > g') 
   flowers.forEach((flower,id) => {
  FLOWERS.set(id,new Flower(flower.id))
  
  });
  
   