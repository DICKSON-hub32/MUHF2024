const openDetails = [];

const detailsElements = document.querySelectorAll('details');

detailsElements.forEach(detail => {
  detail.addEventListener('toggle', function () {
    if (this.open) {
      openDetails.push(this);

      if (openDetails.length > 2) {
        const oldestOpenDetail = openDetails.shift();
        oldestOpenDetail.open = false;
      }
    } else {
      const index = openDetails.indexOf(this);
      if (index !== -1) {
        openDetails.splice(index, 1);
      }
    }
  });
});