export interface expensesList{
    id: number;
    img:string;
    check: boolean;
    x: boolean;
    employee: string;
    title: string;
    purchaseFrom: string;
    date: string;
    amount: string;
    paidBy: string;
    ApprovalStatus: string;
    statusBg: string;
}

export const expenses: expensesList[] | any =[
    {id: 1, img:"./assets/images/users/1.jpg", employee: 'Faith Harris' ,title:'Bike Services',  purchaseFrom:'ABC Service Center', date:'01-10-2021', amount:'$678', paidBy:'Card', ApprovalStatus: 'Approved', statusBg:"badge bg-success", check:true, x:true },
    {id: 2, img:'./assets/images/users/9.jpg', employee: 'Austin Bell' ,title:'Bike Services', purchaseFrom:'ABC Service Center', date:'01-10-2021', amount:'$678', paidBy:'Card', ApprovalStatus: 'Rejected', statusBg:"badge bg-danger", check:true, x:false },
    {id: 3, img:'./assets/images/users/2.jpg', employee: 'Maria Bower' ,title:'Pens', purchaseFrom:'Books stationery', date:'11-12-2020', amount:'$12', paidBy:'Cash', ApprovalStatus: 'Approved', statusBg:"badge bg-success", check:true, x:true },
    {id: 4, img:'./assets/images/users/10.jpg', employee: 'Maria Bower' ,title:'Mouse Pad', purchaseFrom:'Aamzon', date:'21-11-2020', amount:'$45', paidBy:'Online Payment', ApprovalStatus: 'Pending', statusBg:"badge bg-warning", check:true, x:true },
    {id: 5, img:'./assets/images/users/3.jpg', employee: 'Victoria Lyman' ,title:'Data Connection', purchaseFrom:'PhonePe', date:'16-10-2020', amount:'$599', paidBy:'Online Payment', ApprovalStatus: 'Approved', statusBg:"badge bg-success", check:true, x:true },
    {id: 6, img:'./assets/images/users/11.jpg', employee: 'Adam Quinn' ,title:'Mobile Recharge', purchaseFrom:'PhonePe', date:'15-10-2020', amount:'$100', paidBy:'Online Payment', ApprovalStatus: 'Approved', statusBg:"badge bg-success", check:true, x:true },
    {id: 7, img:'./assets/images/users/4.jpg', employee: 'Melanie Coleman' ,title:'Bike Fuel',  purchaseFrom:'Petrol Bunk', date:'12-09-2020', amount:'$220', paidBy:'Card', ApprovalStatus: 'Pending', statusBg:"badge bg-warning", check:true, x:true },
    {id: 8, img:'./assets/images/users/12.jpg', employee: 'Max Wilson' ,title:'Bike Fuel', purchaseFrom:'Petrol Bunk', date:'12-09-2020', amount:'$220', paidBy:'Card', ApprovalStatus: 'Rejected', statusBg:"badge bg-danger", check:true, x:false },
]