export interface attendanceViewType{
    id: string;
    img: string;
    name: string;
    lastAbsent: string;
    lastAbsentStatus: string;
    halfDay: string;
    sick: string;
    casual: string;
    maternity: string;
    paternity: string;
    annual: string;
    unpaid: string;
    others: string;
    creditLeaves: string;
    status: string;
    statusText: string;
}

export const attendanceView:attendanceViewType[] =[
    {id: '#2987', img: './assets/images/users/1.jpg', name:'Faith Harris', lastAbsent:'4 days', lastAbsentStatus:'badge-danger-light', halfDay:'1', sick:'0', casual:'4', maternity:'0', paternity:'0', annual:'0', unpaid:'0', others:'0', creditLeaves:'21', status:'success', statusText:'Active'},
    {id: '#4987', img: './assets/images/users/9.jpg', name:'Austin Bell', lastAbsent:'Never', lastAbsentStatus:'badge-success-light', halfDay:'3', sick:'0', casual:'0', maternity:'0', paternity:'0', annual:'0', unpaid:'0', others:'0', creditLeaves:'21', status:'success', statusText:'Active'},
    {id: '#6729', img: './assets/images/users/2.jpg', name:'Maria Bower', lastAbsent:'8 days', lastAbsentStatus:'badge-danger-light', halfDay:'1', sick:'4', casual:'4', maternity:'0', paternity:'0', annual:'0', unpaid:'0', others:'0', creditLeaves:'21', status:'success', statusText:'Active'},
    {id: '#2098', img: './assets/images/users/10.jpg', name:'Peter Hill', lastAbsent:'Never', lastAbsentStatus:'badge-success-light', halfDay:'1', sick:'0', casual:'0', maternity:'0', paternity:'0', annual:'0', unpaid:'0', others:'0', creditLeaves:'21', status:'success', statusText:'Active'},
    {id: '#1025', img: './assets/images/users/3.jpg', name:'Victoria Lyman', lastAbsent:'Never', lastAbsentStatus:'badge-success-light', halfDay:'0', sick:'0', casual:'0', maternity:'0', paternity:'0', annual:'0', unpaid:'0', others:'0', creditLeaves:'21', status:'success', statusText:'Active'},
    {id: '#3262', img: './assets/images/users/11.jpg', name:'Adam Quinn', lastAbsent:'10 days', lastAbsentStatus:'badge-danger-light', halfDay:'0', sick:'5', casual:'4', maternity:'0', paternity:'0', annual:'0', unpaid:'1', others:'0', creditLeaves:'21', status:'success', statusText:'Active'},
    {id: '#3489', img: './assets/images/users/4.jpg', name:'Melanie Coleman', lastAbsent:'2 days', lastAbsentStatus:'badge-danger-light', halfDay:'1', sick:'0', casual:'2', maternity:'0', paternity:'0', annual:'0', unpaid:'0', others:'0', creditLeaves:'21', status:'success', statusText:'Active'},
    {id: '#3698', img: './assets/images/users/12.jpg', name:'Max Wilson', lastAbsent:'4 days', lastAbsentStatus:'badge-danger-light', halfDay:'1', sick:'4', casual:'0', maternity:'0', paternity:'0', annual:'0', unpaid:'0', others:'0', creditLeaves:'21', status:'success', statusText:'Active'},
    {id: '#5612', img: './assets/images/users/5.jpg', name:'Amelia Russell', lastAbsent:'1 days', lastAbsentStatus:'badge-danger-light', halfDay:'1', sick:'0', casual:'1', maternity:'0', paternity:'0', annual:'0', unpaid:'0', others:'0', creditLeaves:'21', status:'success', statusText:'Active'},
    {id: '#0245', img: './assets/images/users/13.jpg', name:'Justin Metcalfe', lastAbsent:'Never', lastAbsentStatus:'badge-success-light', halfDay:'0', sick:'0', casual:'0', maternity:'0', paternity:'0', annual:'0', unpaid:'0', others:'0', creditLeaves:'21', status:'success', statusText:'Active'},
    {id: '#3467', img: './assets/images/users/6.jpg', name:'Sophie Anderson', lastAbsent:'2 days', lastAbsentStatus:'badge-danger-light', halfDay:'1', sick:'0', casual:'2', maternity:'0', paternity:'0', annual:'0', unpaid:'0', others:'0', creditLeaves:'21', status:'success', statusText:'Active'},
    {id: '#2987', img: './assets/images/users/14.jpg', name:'Ryan Young', lastAbsent:'1 days', lastAbsentStatus:'badge-danger-light', halfDay:'1', sick:'0', casual:'1', maternity:'0', paternity:'0', annual:'0', unpaid:'0', others:'0', creditLeaves:'21', status:'success', statusText:'Active'},
]