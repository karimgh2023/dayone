export interface TodoListType {
    id: number;
    starText : string;
    img : string;
    name: string;
    task: string;
    status: string;
    statusText: string;
}

export const TodoList01List: TodoListType[]= [
    {id:1, starText: '', img:'./assets/images/users/1.jpg', name: 'Shamika Griffith', task: 'Work Assigned By Clients', statusText:'New', status: 'primary'},
    {id:2, starText: 'text-warning', img:'./assets/images/users/2.jpg', name: 'Archie Kesler', task: 'Try To Get New Work', statusText:'Completed', status: 'success'},
    {id:3, starText: '', img:'./assets/images/users/3.jpg', name: 'Carolyne Wirtz', task: 'Rationally Encounter Quences', statusText:'New', status: 'primary'},
    {id:4, starText: '', img:'./assets/images/users/4.jpg', name: 'Consuelo Valenzuela', task: 'Which Of Us Ever Undertakes', statusText:'Completed', status: 'success'},
    {id:5, starText: '', img:'./assets/images/users/5.jpg', name: 'Myrta Powe', task: 'Quis Autem Vel Eum Iure', statusText:'New', status: 'primary'},
    {id:6, starText: '', img:'./assets/images/users/6.jpg', name: 'Margarette Wycoff', task: '	Ut Enim Ad Minima Veniam', statusText:'Pending', status: 'warning'},
    {id:7, starText: 'text-warning', img:'./assets/images/users/7.jpg', name: 'Veronica Kimery', task: 'Inventore Veritatis Et Quasi', statusText:'Completed', status: 'success'},
    {id:8, starText: '', img:'./assets/images/users/8.jpg', name: 'Raisa Ladwig', task: 'Vero Eos Et Accusamus Et Iusto', statusText:'New', status: 'primary'},
    {id:9, starText: 'text-warning', img:'./assets/images/users/9.jpg', name: 'Kathaleen Roysden', task: 'Which Of Us Ever Undertakes', statusText:'Pending', status: 'warning'},
    {id:10, starText: '', img:'./assets/images/users/10.jpg', name: 'Elizabeth Loux', task: 'Account Of The System', statusText:'New', status: 'primary'},
]