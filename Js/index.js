const music = document.getElementById('background-music');

  function startMusic() {
    music.play();
    window.removeEventListener('click', startMusic);
    window.removeEventListener('touchstart', startMusic);
    window.removeEventListener('wheel', startMusic);
  }

  window.addEventListener('click', startMusic);
  window.addEventListener('touchstart', startMusic);
  window.addEventListener('wheel', startMusic);



    let currentSection = 0;
    const sections = document.querySelectorAll('.section');
  
    let touchStartY = 0;
  
    window.addEventListener('wheel', function(e) {
      if (e.deltaY > 0) {
        if (currentSection < sections.length - 1) currentSection++;
      } else {
        if (currentSection > 0) currentSection--;
      }
      sections[currentSection].scrollIntoView({ behavior: 'smooth' });
    }, { passive: true });
  
    window.addEventListener('touchstart', function(e) {
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });
  
    window.addEventListener('touchend', function(e) {
      let touchEndY = e.changedTouches[0].clientY;
      let deltaY = touchStartY - touchEndY;
  
      if (Math.abs(deltaY) > 50) { // ngưỡng nhận diện vuốt
        if (deltaY > 0) { // vuốt lên (di chuyển xuống)
          if (currentSection < sections.length - 1) currentSection++;
        } else { // vuốt xuống (di chuyển lên)
          if (currentSection > 0) currentSection--;
        }
        sections[currentSection].scrollIntoView({ behavior: 'smooth' });
      }
    }, { passive: true });


   
   /**---------------------------------------------------------------------------**/

  // Link CSV công khai từ Google Sheets
  const csvUrl = 'https://docs.google.com/spreadsheets/d/1sjPNE-uOi0mwUij-Y2iAC_Zx0J-vZh-FfqjXtwnjNSc/export?format=csv&gid=1560662980';

    fetch(csvUrl)
        .then(response => response.text())
        .then(csvText => {
            const rows = csvText.trim().split('\n').map(row => row.split(','));
            console.log('Dữ liệu:', rows);

            const headers = rows[0];

            const tenDoiIndex = headers.indexOf('Tên đội');
            const tranIndex = headers.indexOf('Trận');
            const thangIndex = headers.indexOf('Thắng');
            const thuaIndex = headers.indexOf('Thua');
            const hoaIndex = headers.indexOf('Hòa');
            const diemIndex = headers.indexOf('Điểm');

            if (tenDoiIndex === -1) {
                alert('Không tìm thấy cột "Tên đội" trong dữ liệu.');
                return;
            }

            const tbody = document.getElementById('sodo');

            // Xóa dòng mẫu trước khi thêm dữ liệu
            const templateRow = document.getElementById('templateRow');
            if (templateRow) {
                tbody.removeChild(templateRow);
            }

            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                const tr = document.createElement('tr');

                [tenDoiIndex, tranIndex, thangIndex, thuaIndex, hoaIndex, diemIndex].forEach(index => {
                    const td = document.createElement('td');
                    td.textContent = row[index] || '0';
                    tr.appendChild(td);
                });

                tbody.appendChild(tr);
            }
        })
        .catch(error => console.error('Lỗi khi tải dữ liệu:', error));


        const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show');
  });