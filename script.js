
const resources = [
  {
    title: "Introduction to Computer Science",
    subject: "Computer Science",
    type: "Course",
    icon: "💻",
    description: "Explore the fundamentals of computing, algorithms, and programming through structured learning.",
    url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/"
  },
  {
    title: "MDN Web Development",
    subject: "Computer Science",
    type: "Tutorial",
    icon: "🌐",
    description: "Learn HTML, CSS, JavaScript, and essential web development concepts with practical guides.",
    url: "https://developer.mozilla.org/en-US/docs/Learn_web_development"
  },
  {
    title: "Python Documentation",
    subject: "Computer Science",
    type: "Documentation",
    icon: "🐍",
    description: "Explore the official Python tutorial, language features, and programming references.",
    url: "https://docs.python.org/3/tutorial/"
  },
  {
    title: "Introduction to Algorithms",
    subject: "Computer Science",
    type: "Course",
    icon: "⚙️",
    description: "Study algorithm design, computational thinking, and problem-solving techniques.",
    url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/"
  },
  {
    title: "College Algebra 2e",
    subject: "Mathematics",
    type: "E-Book",
    icon: "📐",
    description: "A free textbook covering equations, functions, graphs, and algebraic concepts.",
    url: "https://openstax.org/details/books/college-algebra-2e"
  },
  {
    title: "Calculus Volume 1",
    subject: "Mathematics",
    type: "E-Book",
    icon: "📘",
    description: "Understand limits, derivatives, and the foundations of calculus with worked examples.",
    url: "https://openstax.org/details/books/calculus-volume-1"
  },
  {
    title: "Statistics",
    subject: "Mathematics",
    type: "E-Book",
    icon: "📊",
    description: "Learn probability, data analysis, distributions, and statistical reasoning.",
    url: "https://openstax.org/details/books/introductory-statistics-2e"
  },
  {
    title: "Biology 2e",
    subject: "Science",
    type: "E-Book",
    icon: "🧬",
    description: "Explore cells, genetics, evolution, ecology, and the science of living organisms.",
    url: "https://openstax.org/details/books/biology-2e"
  },
  {
    title: "University Physics Volume 1",
    subject: "Science",
    type: "E-Book",
    icon: "🔭",
    description: "Study mechanics, motion, forces, and other important physics concepts.",
    url: "https://openstax.org/details/books/university-physics-volume-1"
  },
  {
    title: "Chemistry 2e",
    subject: "Science",
    type: "E-Book",
    icon: "🧪",
    description: "Learn atomic structure, chemical reactions, bonding, and chemical principles.",
    url: "https://openstax.org/details/books/chemistry-2e"
  },
  {
    title: "Engineering Mechanics",
    subject: "Engineering",
    type: "Course",
    icon: "🏗️",
    description: "Explore mechanics concepts and engineering problem-solving through MIT course materials.",
    url: "https://ocw.mit.edu/courses/2-001-mechanics-materials-i-fall-2006/"
  },
  {
    title: "Introduction to Electrical Engineering",
    subject: "Engineering",
    type: "Course",
    icon: "⚡",
    description: "Discover electrical engineering fundamentals through open university course materials.",
    url: "https://nptel.ac.in/"
  },
  {
    title: "Principles of Management",
    subject: "Business",
    type: "E-Book",
    icon: "📈",
    description: "Learn management principles, leadership, planning, and organizational fundamentals.",
    url: "https://openstax.org/details/books/principles-management"
  },
  {
    title: "Introduction to Business",
    subject: "Business",
    type: "E-Book",
    icon: "💼",
    description: "Understand business environments, entrepreneurship, marketing, and operations.",
    url: "https://openstax.org/details/books/introduction-business"
  },
  {
    title: "Khan Academy",
    subject: "General",
    type: "Learning Platform",
    icon: "🎓",
    description: "Access free lessons and practice exercises across mathematics, science, and more.",
    url: "https://www.khanacademy.org/"
  }
];

const resourceGrid = document.getElementById("resourceGrid");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const resourceCount = document.getElementById("resourceCount");
const emptyState = document.getElementById("emptyState");
const resetFilters = document.getElementById("resetFilters");

let selectedSubject = "All";

// Display resources
function displayResources(items) {
  resourceGrid.innerHTML = "";

  resourceCount.textContent =
    `${items.length} ${items.length === 1 ? "resource" : "resources"}`;

  if (items.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  items.forEach((resource) => {
    const card = document.createElement("article");
    card.className = "resource-card";

    const top = document.createElement("div");
    top.className = "card-top";

    const icon = document.createElement("div");
    icon.className = "resource-icon";
    icon.textContent = resource.icon;

    const type = document.createElement("span");
    type.className = "resource-type";
    type.textContent = resource.type;

    top.append(icon, type);

    const subject = document.createElement("div");
    subject.className = "subject-tag";
    subject.textContent = resource.subject;

    const title = document.createElement("h3");
    title.textContent = resource.title;

    const description = document.createElement("p");
    description.textContent = resource.description;

    const link = document.createElement("a");
    link.className = "resource-link";
    link.href = resource.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.innerHTML = "<span>Open Resource</span><span>↗</span>";

    card.append(top, subject, title, description, link);
    resourceGrid.appendChild(card);
  });
}

// Search and subject filter
function filterResources() {
  const searchText = searchInput.value.trim().toLowerCase();

  const filteredResources = resources.filter((resource) => {
    const matchesTitle = resource.title.toLowerCase().includes(searchText);
    const matchesSubject =
      selectedSubject === "All" || resource.subject === selectedSubject;

    return matchesTitle && matchesSubject;
  });

  displayResources(filteredResources);
  clearSearch.style.display = searchText ? "block" : "none";
}

// Search input event
searchInput.addEventListener("input", filterResources);

// Clear search
clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  filterResources();
  searchInput.focus();
});

// Subject filter buttons
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");
    selectedSubject = button.dataset.subject;

    filterResources();
  });
});

// Reset filters
resetFilters.addEventListener("click", () => {
  searchInput.value = "";
  selectedSubject = "All";

  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.subject === "All");
  });

  filterResources();
});

// Dynamic footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Initial display
displayResources(resources);
