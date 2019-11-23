
const sidebarMenu = document.querySelector('.sidebar-menu');
if (sidebarMenu) {
  (function () {
    
    const sectionsToTrack = document.querySelectorAll('.section-to-track');
    const bottomRange = window.innerHeight / 2;
    
    // Returns array of elements that are in range - top(0px) - bottomRange.
    const getElementsInRange = function (elements) {
      const elementsInRange = [];
      elements.forEach(function (element) {
        const elementPosition = element.getBoundingClientRect();
        if (elementPosition.top < 0 && elementPosition.height > elementPosition.top * -1) {
          elementsInRange.push({ element: element, top: elementPosition.top });
        } else if (elementPosition.top >= 0 && elementPosition.top < bottomRange) {
          elementsInRange.push({ element: element, top: elementPosition.top });
        } else {
          element.classList.remove('active'); 
        }
      })
      return elementsInRange;
    }

    // Returns Element whos top position is closest to the top 
    const elementWithPriority = function () {
      const elementsInRange = getElementsInRange(sectionsToTrack);
      elementsInRange.sort(function (a, b) {
        if (a.top < 0) {
          a.top = a.top * -1;
        }
        if (b.top < 0) {
          b.top = b.top * -1;
        }
        return a.top - b.top
      });
      return elementsInRange[0];
    }

    // This function gets run on load and page scroll.
    // Add active class to menu Item if tracked section is in range.
    const activateMenuItem = function () {
      const idToActivate = elementWithPriority();
      const currentActiveItem = document.querySelector('.sidebar-menu li a.active');
      if (currentActiveItem) {
        currentActiveItem.classList.remove('active');
      }
      if (idToActivate) {
        const itemToActivate = document.querySelector('[data-section="' + idToActivate.element.id + '"]');
        itemToActivate.classList.add('active');
      }
    }

    activateMenuItem();
    window.addEventListener('scroll', activateMenuItem);
  
  })()
}
