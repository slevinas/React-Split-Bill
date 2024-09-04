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
  const [selectedFriend, setSelectedFriend] = useState(null);


  function handleShowFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);    
  }

  function handleSelectFriend(id) {
    const friend = friends.find((friend) => friend.id === id);
    // in case the friend is already selected, we want to deselect it
    if (selectedFriend && selectedFriend.id === friend.id) {
      setSelectedFriend(null);
      return;
    }
    setSelectedFriend(friend);
    setShowAddFriend(false);
    
  }

  function handleSplitBill(amount) {
    // const newFriends = friends.map((friend) => {
    //   if (friend.id === selectedFriend.id) {
    //     console.log('the friend is: ', friend);
    //     console.log('and the received amount is: ', amount);
    //     friend.balance += amount;
    //   }
    //   return friend;
    // });
    // console.log('from handleSplitBill.newFriends', newFriends);
    setFriends((friends) =>
      friends.map((friend) => 
        friend.id === selectedFriend.id ? { ...friend, balance: friend.balance + amount } : friend
      )
       
    );
    
    setSelectedFriend(null);
    // console.log('from handleSplitBill', amount);
    
  }

  return (
    <div className="app">
     <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelectFriend={handleSelectFriend}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <FormAddFriend  onAddFriend={handleAddFriend}/>}
      
        <Button onClick={handleShowFriend}>{showAddFriend ?"Close":  "Add Friend"}</Button>
        </div>

        {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill} />}
       
    </div>
  );
}


function FriendsList({friends , onSelectFriend, selectedFriend}) {


  return (
    
      <ul>
        {friends.map((friend) => (
          <Friend key={friend.id} friend={friend} onSelectFriend={onSelectFriend} selectedFriend={selectedFriend}/>
        ))}
      
      </ul>
   
  );
}

function Button({onClick, children}) {


  return <button className="button" onClick={onClick}>{children}</button>;
  
}

function Friend({friend, onSelectFriend, selectedFriend}) {

  const isSelected = selectedFriend && selectedFriend.id === friend.id;

  function handleSelectFriend() {
    // call the onSelectFriend function from the parent component
    // Setting the state of the selected friend
    onSelectFriend(friend.id);
  }


  return (
    <li className={isSelected ? 'selected': ''}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="red">You owe {friend.name}  ${Math.abs(friend.balance)}</p>

      )}
      {friend.balance < 0 && (
        <p className="green">{friend.name} owes you ${Math.abs(friend.balance)}</p>

      )}
      {friend.balance === 0 && <p>{friend.name} is all settled up!</p>}
      <Button onClick={handleSelectFriend}>{isSelected ? 'Close':'Select' }</Button>
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

function FormSplitBill({selectedFriend, onSplitBill}) {
  const [bill, setBill] = useState("");
  const [myPartInBill, setMyPartInBill] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("me");
  // Derive the paidByFriend value
  const friendPartInBill = bill ?  bill - myPartInBill : "";


  function handleSubmit(e) {
    e.preventDefault(); // prevent the form from submitting ie. refreshing the page

    // Prevent empty bill and paidByUser
    if (!bill || !myPartInBill) return;
    // Calculate the new Friend's balance based on who is paying the bill
    // if i'm paying the bill, the new balance of the selected friend will be Negative=ows me.
    // if the selected friend is paying the bill, the new balance of the selected friend will be Positive=I owe them.
    const newBalance = whoIsPaying === "me" ? friendPartInBill*-1 : myPartInBill;

    console.log('from FormSplitBill.handleSubmit.friendPartInBill', friendPartInBill);
    console.log('typeof friendPartInBill', typeof friendPartInBill);

    console.log('from FormSplitBill.handleSubmit.newBalance', newBalance);

    // update the balance of the selected friend
  
    // call the onSplitBill function from the parent component
    onSplitBill(newBalance);

    // reset the form
    setBill("");
    setMyPartInBill("");
    setWhoIsPaying("me");
  }


  return (
    <form className="form-split-bill"  onSubmit={handleSubmit}>
      <h2>Split the Bill with {selectedFriend.name}</h2>

      <label> Bill value</label>
      <input
        placeholder="Bill"
        type="text"
        onChange={(e) =>  setBill(Number(e.target.value))}
        value={bill}
      />

      <label>Your expense</label>
      <input type="text" placeholder="Your expense" value={myPartInBill} onChange={(e) => setMyPartInBill(Number(e.target.value) > bill ? myPartInBill: Number(e.target.value))} />

      <label>{selectedFriend.name} expense</label>
      <input id="friend-expense" type="number" placeholder="Friend's expense" disabled value={friendPartInBill} />

      <label>Who is Paying the Bill ?</label>
      <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="me">Me</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button >Split Bill</Button>
    </form>
  );
}