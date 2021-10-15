// Document.getElementById
// 주어진 문자열과 일치하는 id 어트리뷰트를 가진 엘리먼트를 반환 없으면 null
document.getElementById('someId');

// Document.createElement
// 지정한 tagName의 HTML Element를 만들어 반환한다.
document.createElement('div');

// Node.appendChild
// 어떤 노드를 특정 부모 노드의 자식 노드 리스트중 마지막 자신으로 붙인다.
// 만약 노드가 이미 부모를 가지고 있다면 삭제되고 새로운 위치로 이동한다.
const p = document.createElement('p');
document.body.appendChild(p);

// Node.removeChild
// DOM에서 자식 노드를 제거하고 제거된 노드를 반환한다.
document.removeChild(p);


export { };