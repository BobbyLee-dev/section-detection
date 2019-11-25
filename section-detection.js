
const sidebarMenu = document.querySelector('.sidebar-menu');
if (sidebarMenu) {
  (function () {
    
    const sectionsToTrack = document.querySelectorAll('.section-to-track');
    const middleOfViewport = window.innerHeight / 2;
    
    // Returns array of elements that are in range - top(0px) - middleOfViewport.
    const getElementsInViewport = function (elements) {
      const elementsInViewport = [];
      elements.forEach(function (element) {
        const elementPosition = element.getBoundingClientRect();
        if (elementPosition.top < 0 && elementPosition.height > elementPosition.top * -1) {
          elementsInViewport.push({ element: element, top: elementPosition.top });
        } else if (elementPosition.top >= 0 && elementPosition.top < middleOfViewport) {
          elementsInViewport.push({ element: element, top: elementPosition.top });
        } else {
          element.classList.remove('active'); 
        }
      })
      return elementsInViewport;
    }

    // Returns Element whos top position is closest to the top.
    const elementWithPriority = function () {
      const elementsInViewport = getElementsInViewport(sectionsToTrack);
      elementsInViewport.sort(function (a, b) {
        if (a.top < 0) {
          a.top = a.top * -1;
        }
        if (b.top < 0) {
          b.top = b.top * -1;
        }
        return a.top - b.top
      });
      return elementsInViewport[0];
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
