export interface noticeBoardList{
    id: number;
    title: string;
    description: string;
    to: string;
    createOn: string;
    status: string;
    statusBg: string;
}

export const noticeBoard: noticeBoardList[] | any =[
    {id: 1, title:'Board meeting Completed', description:'Attend the company mangers & teamleads.', to:'Employees', createOn:'18-02-2021', status:'Active', statusBg:'badge badge-success'},
    {id: 2, title:'	Updated the Company Policy', description:'some changes & add the terms & conditions.', to:'Employees', createOn:'16-02-2021', status:'Active', statusBg:'badge badge-success'},
    {id: 3, title:'Office Timings Changed', description:'This effetct after March 01st 9:00 Am To 5:00 Pm.', to:'Employees', createOn:'17-02-2021', status:'Active', statusBg:'badge badge-success'},
    {id: 4, title:'Republic Day Celebrated', description:'Participate the all employess.', to:'Employees', createOn:'26-01-2021', status:'Active', statusBg:'badge badge-success'},
    {id: 5, title:'Client meeting Completed', description:'Participate the all the managers.', to:'Employees', createOn:'12-01-2021', status:'InActive', statusBg:'badge badge-danger'},
    {id: 6, title:'Update the Employee Leave Policy', description:'Participate the all employess.', to:'Employees', createOn:'01-01-2021', status:'Active', statusBg:'badge badge-success'},
    {id: 7, title:'Faith Harris, Please sent the email', description:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.', to:'Employees', createOn:'26-01-2021', status:'Active', statusBg:'badge badge-success'},
    {id: 8, title:'Update the Agreement Policy', description:'There are many variations of passages of but the majority have suffered alteration.', to:'Employees', createOn:'12-02-2021', status:'InActive', statusBg:'badge badge-danger'},
]