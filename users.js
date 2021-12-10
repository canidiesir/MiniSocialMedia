  const users = document.getElementById("users");
  const userPage = document.getElementById("userPage");
  const posts = document.getElementById("posts");
  const header = document.getElementById("header");

  // Fetching users data and displaying
  const loadUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((json) => displayUsers(json));
  }

  // Fetching posts data, filtering by user-id, and displaying
  const loadPosts = (userId) => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => displayPosts(json.filter(element => element.userId === userId)));
  }

  // Displaying users as the page is opened.
  loadUsers();

  // Clearing posts page then adding user's posts in it.
  const displayPosts = (json) => {
    this.posts.innerHTML = '';
    json.forEach(element => {
      const post = document.createElement("div");
      post.classList.add("post")

      const postTitle = document.createElement("span");
      postTitle.textContent = element.title;
      post.appendChild(postTitle);

      const postBody = document.createElement("span");
      postBody.textContent = element.body;
      post.appendChild(postBody);

      this.posts.appendChild(post);
    });

    goToPostsPage();
    
  }

  // Clearing user's page then adding user's names as buttons.
  // Adding listeners to each button to redirect to user's page when clicked.
  const displayUsers = (json) => {
    this.users.innerHTML = '';

    json.forEach(element => {
      const user = document.createElement("button");
      user.textContent = element.name;
      this.users.appendChild(user)

      user.addEventListener("click", function (){
        displayUser(element)
      });
    });

    goToUserListPage();
  } 

  // Clearing user's page and adding every information given.
  // Also adding posts' button and listener to redirect posts' page when clicked.
  function displayUser(user) {
    this.userPage.innerHTML = '';

    deepSearch(user, 0);

    const postList = document.createElement("button");
    postList.classList.add("post_list")
    postList.textContent = "User's Posts";
    this.userPage.appendChild(postList);

    postList.addEventListener("click", function(){
      loadPosts(user.id)
    })
    
    goToUserPage();
  }

  // User's info displayed. 
  // Also adding tabs to objects inside objects so it is displayed more clearly.
  const deepSearch = (object, tab) => {
    Object.keys(object).forEach(key => {

    if (typeof object[key] === 'object') {
      const userInfo = document.createElement("div");
      userInfo.style.paddingLeft = tab + 'px';
      userInfo.textContent = (key + " ---------");
      this.userPage.appendChild(userInfo);
      deepSearch(object[key], tab + 15)
    } else {
      const userInfo = document.createElement("div");
      userInfo.style.paddingLeft = tab + 'px';
      userInfo.textContent = (key + ": " + object[key]);
      this.userPage.appendChild(userInfo);
    }})
}


  // Displaying user info page, hiding others.
  // Also displaying header and back to user list button.
  function goToUserPage(){
    this.users.style.display = "none";
    this.posts.style.display = "none";
    this.userPage.style.display = "block";
    this.header.style.display = "block";
    let backToUserPageButton = document.getElementById("userPageButton");
    backToUserPageButton.style.display = "none";
  }

  // Displaying user list page, hiding others and header.
  function goToUserListPage(){
    this.userPage.style.display = "none";
    this.posts.style.display = "none";
    this.users.style.display = "flex";
    this.header.style.display = "none";
  }

  // Displaying posts page, hiding others.
  // Also displaying header, back to user list button and back tu user page button as well.
  function goToPostsPage(){
    this.users.style.display = "none";
    this.userPage.style.display = "none";
    this.posts.style.display = "block";
    this.header.style.display = "block";
    let backToUserPageButton = document.getElementById("userPageButton");
    backToUserPageButton.style.display = "unset";
  }

  function goToUsers(){
    loadUsers();
  }
  

