window.addEventListener("load", () => {
  // This is a check to see if there's a username stored
  let username = localStorage.getItem("username");
  document.querySelector("#logout").addEventListener("click", function () { clearData() });
  if (!username) {
    /* Prompt for one if a username isn't found
    ユーザー名が見つからない場合は入力を求めるプロンプトを表示する
    */
    username = window.prompt("What is your name?");
    localStorage.setItem("username", username);       //localStorageに"username"で保存
    window.location.reload();

  } else {
    const localStorageElement = document.querySelector("#name");
    localStorageElement.innerText = `( ${username} )`;
  }
  document.querySelector("#post-button").addEventListener("click", function () {
    let hashContent = document.querySelector("#hashtag").value;
    let feelContent = document.querySelector("#feeling").value;
    let textContent = document.querySelector("#usertext").value;
    let dateTi = new Date();
    const addText = {
      friend: username,
      text: `${textContent} ${hashContent}`,
      feeling: feelContent,
      image: "/Users/user/Desktop/precourse.bacefook-dig/images/tired.jpg",
      timestamp: dateTi
    };
    const addTextData = addText;
    const addTextJSONData = JSON.stringify(addTextData);
    window.localStorage.setItem("newPost", addTextJSONData);
    window.location.reload();
  });
  if (JSON.parse(window.localStorage.getItem("newPost") !== "[object Object]")) {
    const storagPost = JSON.parse(window.localStorage.getItem("newPost"));
    if (storagPost !== null) {
      bacefook.newsfeed.push(storagPost);
    }
  }
  //console.log(bacefook)
  console.log(`前：　${bacefook.newsfeed[10].timestamp}`)
  console.log(bacefook)
  sort(bacefook);
  // bacefook.newsfeed.sort((a, b) => (a.timestamp) - (b.timestamp));
  //bacefook.newsfeed.sort((a, b) => (a.timestamp.getTime()) - (b.timestamp.getTime()));
  console.log(`あと：　${bacefook.newsfeed[10].timestamp}`)
  console.log(bacefook)
  feed(bacefook);
});

function feed(array) {
  console.log(array, Object.keys(array.newsfeed).length) //lengthの値と実際のオブジェクトレングスの値が違う？
  const containerEl = document.querySelector("#newsfeed");
  let post = [];
  for (let index = array.newsfeed.length - 1; index >= 0; index--) {
    post = array.newsfeed[index];
    console.log(post)
    newFeed(post);
  }
  return;
};

function newFeed(textEl) {
  const containerEl = document.querySelector("#newsfeed");
  const friendEl = document.createElement("div");
  friendEl.innerText = textEl.friend;

  const postEl = document.createElement("div");
  postEl.innerText = textEl.text;
  postEl.append(friendEl);

  const feelingEl = document.createElement("div");
  feelingEl.innerText = textEl.feeling;
  feelingEl.append(postEl);

  const dateTimeEl = document.createElement("div");
  let dateTo = moment(textEl.timestamp);
  let dateFrom = moment();
  let dateTime = 0;
  if (dateFrom.diff(dateTo) >= (24 * 60 * 60 * 1000)) {
    dateTime = `posted ${dateFrom.diff(dateTo, 'days')} days ago`;
  } else if (dateFrom.diff(dateTo) >= (60 * 60 * 1000)) {
    dateTime = `posted ${dateFrom.diff(dateTo, 'hours')} hours ago`;
  } else {
    dateTime = `posted ${dateFrom.diff(dateTo, 'minutes')} minutes ago`;
  }

  dateTimeEl.innerText = dateTime;
  dateTimeEl.classname = "card-datetime";
  feelingEl.append(dateTimeEl);

  const imageEl = document.createElement("img");
  imageEl.src = textEl.image;
  imageEl.width = "500";
  imageEl.className = "card-img";

  const blockEl = document.createElement("hr");
  const cardContainer = document.createElement("div")
  cardContainer.className = "cardContainer";

  cardContainer.append(imageEl);
  cardContainer.append(feelingEl);
  containerEl.append(cardContainer);
  containerEl.append(blockEl);
  return;
}

const clearData = () => {
  localStorage.removeItem("username");
  alert("ログアウトしました！！");
  window.location.reload();
  return;
}

function sort(arr) {                           //*************　挿入ソート
  const sortResult = arr;
  let tmp = 0;
  let j = 0;
  for (let i = 1; i < sortResult.newsfeed.length; i++) {
    tmp = sortResult.newsfeed[i].timestamp;
    for (j = i - 1; j >= 0; j--) {
      if (tmp > sortResult.newsfeed[j].timestamp) {
        break;
      } else {
        sortResult.newsfeed[j + 1].timestamp = sortResult.newsfeed[j].timestamp;
      }
    }
    sortResult.newsfeed[j + 1].timestamp = tmp;
  }
  return sortResult;
}