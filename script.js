// Banner Slider İşlevleri
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

// Slider'ı başlat
function startSlider() {
    if (slides.length > 0) {
        setInterval(() => {
            changeSlide(1);  // Doğru yön: Sağ -> Sonraki slide
        }, 5000);
    }
}

// Slider'ı değiştir (Düzeltildi)
function changeSlide(direction) {
    if (!slides.length) return;

    // Mevcut slide'ı gizle
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');

    // Yönleri düzelttik: 
    if (direction === 1) {
        // Sağ ok -> Sonraki slide
        currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    } else {
        // Sol ok -> Önceki slide
        currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
     ;
    }

    // Yeni slide'ı göster
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

// Belirli bir slide'a git
function goToSlide(n) {
    if (!slides.length) return;

    // Mevcut slide'ı gizle
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');

    // Yeni slide'ı ayarla
    currentSlideIndex = n;

    // Yeni slide'ı göster
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

// Olay dinleyicileri ekle
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".prev").addEventListener("click", () => changeSlide(-1)); // Sol ok -> Geri gitmeli
    document.querySelector(".next").addEventListener("click", () => changeSlide(1)); // Sağ ok -> İleri gitmeli
    
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => goToSlide(index));
    });

    startSlider();
});
// Arama İşlevi
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchProducts();
        }
    });
}

function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    alert(`"${searchTerm}" için arama yapılıyor...`);
    // Gerçek bir projede burada API çağrısı veya sayfaya yönlendirme yapılabilir
}

// Ürünler Sayfası Filtreleme
document.addEventListener('DOMContentLoaded', function() {
    // Fiyat aralığı sürgüsü
    const priceRange = document.getElementById('priceRange');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    
    if (priceRange && minPrice && maxPrice) {
        priceRange.addEventListener('input', function() {
            maxPrice.value = this.value;
        });
        
        // Fiyatı uygula butonu
        const applyPrice = document.querySelector('.apply-price');
        if (applyPrice) {
            applyPrice.addEventListener('click', function() {
                filterProducts();
            });
        }
        
        // Filtreleri temizle butonu
        const clearFilters = document.querySelector('.clear-filters');
        if (clearFilters) {
            clearFilters.addEventListener('click', function() {
                resetFilters();
            });
        }
        
        // Kategori ve tür filtrelerini dinle
        const checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                filterProducts();
            });
        });
        
        // Renk filtrelerini dinle
        const colorFilters = document.querySelectorAll('.color-filter');
        colorFilters.forEach(color => {
            color.addEventListener('click', function() {
                this.classList.toggle('selected');
                filterProducts();
            });
        });
        
        // Sıralama değişikliğini dinle
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                sortProducts();
            });
        }
    }
    
    // Sepete ekle butonları
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.parentElement.querySelector('h3').textContent;
            addToCart(productName);
        });
    });

    // Slider'ı başlat
    startSlider();
});

// Ürünleri filtrele
function filterProducts() {
    // Bu demo için sadece bir uyarı gösterelim
    alert('Ürünler filtreleniyor...');
    // Gerçek bir projede burada DOM manipülasyonu veya API çağrısı yapılabilir
}

// Filtreleri sıfırla
function resetFilters() {
    // Checkboxları temizle
    const checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Fiyat aralığını sıfırla
    const priceRange = document.getElementById('priceRange');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    
    if (priceRange && minPrice && maxPrice) {
        priceRange.value = 500;
        minPrice.value = 0;
        maxPrice.value = 1000;
    }
    
    // Renk filtreleri seçimlerini kaldır
    const colorFilters = document.querySelectorAll('.color-filter');
    colorFilters.forEach(color => {
        color.classList.remove('selected');
    });
    
    // Ürünleri yeniden göster
    alert('Filtreler temizlendi.');
}

// Ürünleri sırala
function sortProducts() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        const sortValue = sortSelect.value;
        alert(`Ürünler "${sortValue}" kriterine göre sıralanıyor...`);
        // Gerçek bir projede burada DOM manipülasyonu veya API çağrısı yapılabilir
    }
}

// Sepete ürün ekle
function addToCart(productName) {
    alert(`"${productName}" sepete eklendi!`);
    // Gerçek bir projede bu
}
