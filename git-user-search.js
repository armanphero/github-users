const loadUsers = (userName) => {
    const url = `https://api.github.com/users/${userName}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => checkDataValidity(data))
        .catch(error => console.log(error))
}

const checkDataValidity = (user) => {

    if (user.message === 'Not Found') {
        showError();
    }
    else {
        showUsers(user);
    }

}

const userContainer = document.getElementById('user-container');
const throwError = document.getElementById('throw-error');
const showError = () => {
    throwError.classList.remove('d-none');
    userContainer.classList.add('d-none');
}

const showUsers = (user) => {
    userContainer.classList.remove('d-none');
    throwError.classList.add('d-none');
    const { avatar_url, login, blog, location, created_at, updated_at, html_url, following, followers, followers_url, public_repos } = user;
    // user img
    const userImg = document.getElementById('user-img');
    userImg.setAttribute('src', avatar_url);
    // user name
    document.getElementById('user-name').innerText = login;
    // repositories
    const repositories = document.getElementById('repositories');
    repositories.innerText = public_repos;
    const repositoriesLInk = `${html_url}?tab=repositories`;
    repositories.setAttribute('href', repositoriesLInk);
    // user followers
    const followersNum = document.getElementById('followers-num');
    followersNum.innerText = followers;
    const followersLink = `${html_url}?tab=followers`;
    followersNum.setAttribute('href', followersLink);
    // user following
    const followingNum = document.getElementById('following-num');
    followingNum.innerText = following;
    const followingLink = `${html_url}?tab=following`;
    followingNum.setAttribute('href', followingLink);

    // location
    document.getElementById('location').innerText = location ? location : 'Not Available';
    // blog
    document.getElementById('blog').innerText = blog ? blog : 'Not Available';
    document.getElementById('blog').setAttribute('href', blog);

    // join date
    document.getElementById('join-date').innerText = created_at.slice(0, 10);
    document.getElementById('last-update').innerText = updated_at.slice(0, 10);


    // first two followers set
    loadFollowers(followers_url);

}

const loadFollowers = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayFollowers(data);
    }
    catch (error) {
        console.log(error);
    }
}

const displayFollowers = (followers) => {

    const followers1Img = followers[0]?.avatar_url;
    const followers2Img = followers[1]?.avatar_url;
    document.getElementById('follower1Img').setAttribute('src', followers1Img ? followers1Img : 'https://picsum.photos/600/600');
    document.getElementById('follower2Img').setAttribute('src', followers2Img ? followers2Img : 'https://picsum.photos/600/600');
    // 
    const follower1Repo = followers[0]?.html_url;
    const follower2Repo = followers[1]?.html_url;
    document.getElementById('follower1').setAttribute('href', follower1Repo ? follower1Repo : '');
    document.getElementById('follower2').setAttribute('href', follower2Repo ? follower2Repo : '');


}

const searchedUser = () => {
    const searchInput = document.getElementById('search-input');
    const inputValue = searchInput.value;
    searchInput.value = '';
    loadUsers(inputValue);
}

// loadUsers();