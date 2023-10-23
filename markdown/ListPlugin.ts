const listPlugin = {
  name: 'listPlugin',
   initialize: async () => {
    await import('./ListPlugin.scss');
  },
  process: async (content: string) => {
    // Create a new DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    // Get all li elements
    const liElements = doc.querySelectorAll('li');

    liElements.forEach(li => {
      // Check if img-icon attribute exists
      const imgIcon = li.getAttribute('img-icon');
      const iText = li.getAttribute('i-text');
      const iPrefix = li.getAttribute('i-pre');
      const iSize = li.getAttribute('i-size');
      const iWidth = li.getAttribute('i-width');
      const iHeight = li.getAttribute('i-height');
      const iRightMargin = li.getAttribute('i-right-margin')
      if (imgIcon || iPrefix || iText)  {
        li.classList.add('f-list');
      }

      if (iPrefix) {
        li.classList.add('i-pre');
      }
      if (iSize) {
        li.style.setProperty('--i-size', iSize);
      }
      if (iRightMargin) {
        li.style.setProperty('--i-right-margin', iRightMargin);
      }

      if (imgIcon) {
        li.classList.add('img-icon');
        li.style.setProperty('--img-icon', `url(${imgIcon})`);
        li.style.setProperty('--i-width', iWidth);
        li.style.setProperty('--i-height', iHeight);


        li.removeAttribute('img-icon');
        li.removeAttribute('i-width');
        li.removeAttribute('i-height');
      }

      if (iText) {
        li.classList.add('i-text');
      }

      // Create a new div element
      const div = doc.createElement('div');
      div.className = 'list-item-content';

      // Move all children of li to the div
      while (li.firstChild) {
        div.appendChild(li.firstChild);
      }

      // Append the div to the li
      li.appendChild(div);
    });

    // Serialize the modified content back to a string
    const serializer = new XMLSerializer();
    return serializer.serializeToString(doc.body);
  }

};

export default listPlugin;
