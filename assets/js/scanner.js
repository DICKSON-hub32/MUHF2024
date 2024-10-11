document.addEventListener("DOMContentLoaded", function() {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
    scanner.addListener('scan', function (content) {
      fetch('/validate-ticket/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({ ticket_id: content })
      })
      .then(response => response.json())
      .then(data => {
        const resultDiv = document.getElementById('result');
        if (data.valid) {
          resultDiv.innerHTML = `
            <p class="text-green-500">Ticket validated successfully!</p>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>School:</strong> ${data.school}</p>
            <p><strong>Category:</strong> ${data.category}</p>
            <p><strong>Course:</strong> ${data.course}</p>
            <p><strong>Level:</strong> ${data.level}</p>
          `;
        } else {
          resultDiv.innerHTML = `<p class="text-red-500">${data.error}</p>`;
        }
      });
    });

    Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
        scanner.start(cameras[0]);
      } else {
        console.error('No cameras found.');
      }
    }).catch(function (e) {
      console.error(e);
    });
});