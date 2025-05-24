document.addEventListener("DOMContentLoaded", () => {
    // Banner Slider İşlevleri
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const totalSlides = slides.length;

    function changeSlide(direction) {
        if (totalSlides === 0) return;
        slides[currentSlideIndex].classList.remove("active");
        dots[currentSlideIndex].classList.remove("active");

        if (direction === 1) {
            currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
        } else {
            currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
        }

        slides[currentSlideIndex].classList.add("active");
        dots[currentSlideIndex].classList.add("active");
    }

    function startSlider() {
        if (totalSlides > 0) {
            setInterval(() => changeSlide(1), 5000);
        }
    }

    document.querySelector(".prev")?.addEventListener("click", () => changeSlide(-1));
    document.querySelector(".next")?.addEventListener("click", () => changeSlide(1));
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => goToSlide(index));
    });

    function goToSlide(n) {
        if (totalSlides === 0) return;
        slides[currentSlideIndex].classList.remove("active");
        dots[currentSlideIndex].classList.remove("active");
        currentSlideIndex = n;
        slides[currentSlideIndex].classList.add("active");
        dots[currentSlideIndex].classList.add("active");
    }

    startSlider();

    // Ürün Sayfalama İşlevi
    const itemsPerPage = 16; // Her sayfada gösterilecek ürün sayısı 16
    let currentPage = 1;

    function paginateProducts() {
        const products = document.querySelectorAll(".product-card");
        const totalPages = Math.ceil(products.length / itemsPerPage);
        
        // Sayfa aralığını belirle
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = currentPage * itemsPerPage;

        // Ürünleri sayfalara ayır
        products.forEach((product, index) => {
            if (index >= startIndex && index < endIndex) {
                product.style.display = "flex";  // Ürünü göster
            } else {
                product.style.display = "none";  // Ürünü gizle
            }
        });

        // Sayfa numaralarını güncelle
        updatePagination(totalPages);
    }

    function updatePagination(totalPages) {
        const paginationContainer = document.querySelector(".pagination");
        paginationContainer.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.addEventListener("click", () => {
                currentPage = i;
                paginateProducts();
            });

            if (i === currentPage) {
                pageButton.classList.add("active");
            }

            paginationContainer.appendChild(pageButton);
        }
    }

    // İlk sayfa yüklemesi
    paginateProducts();

    // Arama İşlevi
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                searchProducts();
            }
        });
    }

    function searchProducts() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const products = document.querySelectorAll(".product-card");
        
        products.forEach(product => {
            const productName = product.querySelector("h3").textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                product.style.display = "flex";
            } else {
                product.style.display = "none";
            }
        });

        // Arama sonrası sayfalama yeniden yap
        currentPage = 1; // Arama sonrası ilk sayfaya dön
        paginateProducts();
    }

    // Ürün Filtreleme
    document.querySelector(".apply-price")?.addEventListener("click", filterProducts);
    document.querySelector(".clear-filters")?.addEventListener("click", resetFilters);

    function filterProducts() {
        alert("Ürünler filtreleniyor...");
    }

    function resetFilters() {
        document.querySelectorAll(".filters input[type='checkbox']").forEach(cb => cb.checked = false);
        document.getElementById("priceRange").value = 500;
        document.getElementById("minPrice").value = 0;
        document.getElementById("maxPrice").value = 1000;
        document.querySelectorAll(".color-filter").forEach(color => color.classList.remove("selected"));
        document.querySelectorAll(".product-card").forEach(product => product.style.display = "flex");
        alert("Filtreler temizlendi.");
    }

    // Ürünleri Sırala
    document.getElementById("sort-select")?.addEventListener("change", sortProducts);

    function sortProducts() {
        const sortSelect = document.getElementById("sort-select");
        const productGrid = document.querySelector(".products-grid");
        if (!sortSelect || !productGrid) return;

        const products = Array.from(productGrid.getElementsByClassName("product-card"));
        const sortValue = sortSelect.value;

        products.sort((a, b) => {
            const priceA = parseFloat(a.querySelector(".product-price").textContent.replace(" TL", "").replace(",", "."));
            const priceB = parseFloat(b.querySelector(".product-price").textContent.replace(" TL", "").replace(",", "."));
            
            if (sortValue === "price-low") return priceA - priceB;
            if (sortValue === "price-high") return priceB - priceA;
            return 0;
        });

        productGrid.innerHTML = "";
        products.forEach(product => productGrid.appendChild(product));
    }

    // Sepete Ekleme
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function() {
            const productName = this.closest(".product-info").querySelector("h3").textContent;
            alert(`\"${productName}\" sepete eklendi!`);
        });
    });
});
const commentForm = document.getElementById("commentForm");
const commentList = document.getElementById("commentList");

function loadComments() {
  const saved = JSON.parse(localStorage.getItem("hatcity_comments")) || [];
  commentList.innerHTML = "";

  saved.forEach((comment, index) => {
    const li = document.createElement("li");
    li.classList.add("comment-item");

    li.innerHTML = `
      <p class="comment-text">"${comment.text}"</p>
      <div class="comment-meta">
        <span>${comment.name} ${comment.surname}</span>
        <span class="email">(${comment.email})</span>
      </div>
      <button class="delete-btn" onclick="deleteComment(${index})">Sil</button>
    `;

    commentList.appendChild(li);
  });
}

function saveComment(commentObj) {
  const comments = JSON.parse(localStorage.getItem("hatcity_comments")) || [];
  comments.push(commentObj);
  localStorage.setItem("hatcity_comments", JSON.stringify(comments));
}

function deleteComment(index) {
  const comments = JSON.parse(localStorage.getItem("hatcity_comments")) || [];
  comments.splice(index, 1);
  localStorage.setItem("hatcity_comments", JSON.stringify(comments));
  loadComments();
}

if (commentForm && commentList) {
  loadComments();

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("nameInput").value.trim();
    const surname = document.getElementById("surnameInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    const comment = document.getElementById("commentInput").value.trim();

    if (name && surname && email && comment) {
      saveComment({ name, surname, email, text: comment });
      commentForm.reset();
      loadComments();
    }
  });
}
