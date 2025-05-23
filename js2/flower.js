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
        force3D: false, 
            onComplete:()=>{
             this.idle()
            },
        ease:"Power1.easeInOut"});
        
        // Animate each part staggered
        this.parts.forEach((part, i) => {
          
       
  
          gsap.to(part.el,{duration:(((i*.7)+.1)),scale:1,
            svgOrigin:part.origin,
  
            ease:"Power1.easeInOut"
          
          });
            
            
          });
        }
        
        idle() {
          // Kill any existing tweens to prevent overlap
          // gsap.killTweensOf(this.root);
          // this.parts.forEach(part => gsap.killTweensOf(part.el));
        
          // Animate the root element with random rotation and scale
          gsap.to(this.root, {
            duration: () => gsap.utils.random(3.5, 4.5),
            rotate: () => gsap.utils.random(-5, 5),
            scale: () => gsap.utils.random(0.9, 1.1),
            repeat: -1,
            yoyo: true,
            repeatRefresh: true,
            svgOrigin: this.origin,
            ease: "power1.inOut"
          });
        
          // Animate each part with random rotation
          this.parts.forEach(part => {
      
            
            gsap.to(part.el, {
              duration: () => gsap.utils.random(3.5, 4.5),
              rotate: () => gsap.utils.random(-5, 5),
              repeat: -1,
              yoyo: true,
              repeatRefresh: true,
              svgOrigin: part.origin,
              ease: "power1.inOut"
            });
          });
        }
        hide(){

                    gsap.killTweensOf(this.root);
          this.parts.forEach(part => gsap.killTweensOf(part.el));

          gsap.set(this.root,{
            svgOrigin:this.origin,
            scale:0

          })
          
          this.parts.forEach((part, i) => {
       
          
          
            gsap.set(part.el,{scale:0,
              svgOrigin:part.origin
            });
          
    
        });
       

    }

  }


  // Helper to parse translate(x y)
function parseTranslate(transform) {
  const match = /translate\(([-\d.]+)[,\s]+([-\d.]+)\)/.exec(transform);
  return match ? [parseFloat(match[1]), parseFloat(match[2])] : [0, 0];
}

// Recursively walk DOM and apply cumulative transforms
function flattenTransforms(node, parentOffset = [0, 0]) {
  let localOffset = [0, 0];
  if (node.hasAttribute("transform")) {
    localOffset = parseTranslate(node.getAttribute("transform"));
    node.removeAttribute("transform");
  }

  const totalOffset = [
    parentOffset[0] + localOffset[0],
    parentOffset[1] + localOffset[1],
  ];

  // Apply flattening to current node if it has applicable attributes
  if (node.tagName === "image" || node.tagName === "rect") {
    if (!node.hasAttribute("x")) node.setAttribute("x", "0");
    if (!node.hasAttribute("y")) node.setAttribute("y", "0");

    node.setAttribute("x", parseFloat(node.getAttribute("x")) + totalOffset[0]);
    node.setAttribute("y", parseFloat(node.getAttribute("y")) + totalOffset[1]);
  }

  if (node.tagName === "circle") {
    if (!node.hasAttribute("cx")) node.setAttribute("cx", "0");
    if (!node.hasAttribute("cy")) node.setAttribute("cy", "0");

    node.setAttribute("cx", parseFloat(node.getAttribute("cx")) + totalOffset[0]);
    node.setAttribute("cy", parseFloat(node.getAttribute("cy")) + totalOffset[1]);
  }

  // Recurse for children
  for (let child of node.children) {
    flattenTransforms(child, totalOffset);
  }
}


  const fsvg = await fetch("./flowers.svg") 
   const data = await fsvg.text()

   const container = document.querySelector('[data-flowers]')

   container.innerHTML = data


const svg = container.querySelector('svg');
flattenTransforms(svg); // <- flatten before animation setup

  
// hide all circles from svg
const circles = container.querySelectorAll('circle');
circles.forEach(circle => {
  circle.style.display = 'none';
}
);

  export const FLOWERS = new Map()
  const flowers = document.querySelectorAll('.flowers svg > g') 
   flowers.forEach((flower,id) => {
  FLOWERS.set(id+1,new Flower(flower.id))
  
  });
  
   