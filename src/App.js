import { useState } from "react"

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleShowFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
    
  }

  return (
    <div className="app">
     <div className="sidebar">
        <FriendsList friends={friends} />

        {showAddFriend && <FormAddFriend  onAddFriend={handleAddFriend}/>}
      
        <Button onClick={handleShowFriend}>{showAddFriend ?"Close":  "Add Friend"}</Button>
        </div>
        <FormSplitBill />
    </div>
  );
}


function FriendsList({friends}) {


  return (
    
      <ul>
        {friends.map((friend) => (
          <Friend key={friend.id} friend={friend} />
        ))}
      
      </ul>
   
  );
}

function Button({onClick, children}) {


  return <button className="button" onClick={onClick}>{children}</button>;
  
}

function Friend({friend}) {

  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">You owe {friend.name}  ${Math.abs(friend.balance)}</p>

      )}
      {friend.balance > 0 && (
        <p className="green">{friend.name} owes you ${friend.balance}</p>

      )}
      {friend.balance === 0 && <p>{friend.name} is all settled up!</p>}
      <Button>Select</Button>
    </li>
  );
  
}

function FormAddFriend({onAddFriend}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault(); // prevent the form from submitting ie. refreshing the page

    // Prevent empty name and image
    if (!name || !image) return;


    const id = Date.now();
    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };
    // call the onAddFriend function from the parent component
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Add a Friend</label>
     <input
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Image URL</label>
      <input
        placeholder="Image"
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
     
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split the Bill</h2>

      <label> Bill value</label>
      <input type="number" placeholder="Bill" />

      <label>Your expense</label>
      <input type="number" placeholder="Your expense" />

      <label>Friend's expense</label>
      <input type="number" placeholder="Friend's expense" disabled />

      <label>Who is Paying the Bill ?</label>
      <select>
        <option>Me</option>
        <option>Friend</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}