
//javascript untuk index.html
        // Tanggal otomatis
        document.getElementById('current-year').textContent = new Date().getFullYear();

        // Mobile Menu Drawer Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // efek mengetik
        const phrases = ["Game Developer Enthusiast", "Web Developer", "Mahasiswa Ilmu Komputer", "UI/UX Enthusiast"];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 90;
        const typingTextElement = document.getElementById('typing-text');

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1800);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeEffect, 400);
            } else {
                setTimeout(typeEffect, isDeleting ? typingSpeed / 2 : typingSpeed);
            }
        }

        document.addEventListener('DOMContentLoaded', typeEffect);

        // Filter proyek
        function filterProjects(category) {
            const cards = document.querySelectorAll('.project-card');
            const filterBtns = document.querySelectorAll('.project-filter-btn');

            filterBtns.forEach(btn => {
                if (btn.getAttribute('data-category') === category) {
                    btn.classList.remove('bg-white', 'text-slate-600');
                    btn.classList.add('bg-blue-600', 'text-white');
                } else {
                    btn.classList.add('bg-white', 'text-slate-600');
                    btn.classList.remove('bg-blue-600', 'text-white');
                }
            });

            cards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // popup detail project
        const modal = document.getElementById('project-modal');

        function openModal(title, desc, imgSrc, tags) {
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-desc').textContent = desc;
            document.getElementById('modal-img').src = imgSrc;

            const tagsContainer = document.getElementById('modal-tags');
            tagsContainer.innerHTML = '';
            tags.forEach(tag => {
                const badge = document.createElement('span');
                badge.className = 'px-2.5 py-1 text-xs rounded-md bg-blue-50 text-blue-600 font-medium';
                badge.textContent = tag;
                tagsContainer.appendChild(badge);
            });

            modal.classList.remove('hidden');
        }

        function closeModal() {
            modal.classList.add('hidden');
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

//javascript ppn
        function hitungPPN() {
            // 1. Ambil nilai input dari elemen HTML
            const inputHarga = document.getElementById('harga').value;
            const harga = parseFloat(inputHarga);

            // 2. Jika input kosong atau bukan angka valid, atur ulang tampilan
            if (isNaN(harga) || harga <= 0) {
                document.getElementById('nominalPPN').innerText = 'Rp 0';
                document.getElementById('totalHarga').innerText = 'Rp 0';
                return;
            }

            // 3. Hitung PPN 11% dan Total
            const ppn = harga * 0.11;
            const total = harga + ppn;

            // 4. Tampilkan hasil dengan format mata uang Rupiah
            document.getElementById('nominalPPN').innerText = formatRupiah(ppn);
            document.getElementById('totalHarga').innerText = formatRupiah(total);
        }

        // Fungsi pembantu untuk mengubah angka menjadi format "Rp xx.xxx"
        function formatRupiah(angka) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximumFractionDigits: 0
            }).format(angka);
        }