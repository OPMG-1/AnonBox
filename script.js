const firebaseConfig = {
    apiKey: "AIzaSyCR-7yJFEYOhrwGZ3QMs_BYHLXGF7Fchnc",
    authDomain: "anonbox-8ae39.firebaseapp.com",
    projectId: "anonbox-8ae39",
    storageBucket: "anonbox-8ae39.appspot.com",
    messagingSenderId: "535996906883",
    appId: "1:535996906883:web:baa3ff5b1a4f1f4c48cab6"
};
// Firebase 초기화
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);  // Firestore 초기화

// 건의하기 기능
function submitSuggestion() {
    const input = document.getElementById("suggestionInput");
    const text = input.value.trim();

    if (text === "") {
        alert("건의 내용을 입력해주세요.");
        return;
    }

    // Firestore에 저장
    db.collection("suggestions").add({
        content: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        input.value = ""; // 입력창 초기화
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}

// Firestore 데이터 실시간 반영
db.collection("suggestions").orderBy("timestamp", "desc").onSnapshot(snapshot => {
    const list = document.getElementById("suggestionList");
    list.innerHTML = "";

    snapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement("div");
        div.className = "suggestion";
        div.textContent = data.content;
        list.appendChild(div);
    });
});

// 건의하기 버튼 클릭 이벤트 리스너
document.getElementById("submitBtn").addEventListener("click", submitSuggestion);
