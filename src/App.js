
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
  return (
    <div className="app">
     <div className="sidebar">
        <FriendsList />
        <FormAddFriend />
        <Button>Add Friend</Button>
        </div>
        <FormSplitBill />
    </div>
  );
}


function FriendsList() {
  return (
    
      <ul>
        {initialFriends.map((friend) => (
          <Friend key={friend.id} friend={friend} />
        ))}
      
      </ul>
   
  );
}

function Button({children}) {
  return <button className="button">{children}</button>;
  
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

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <input type="text" placeholder="Name" />
      <input type="number" placeholder="Balance" />
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