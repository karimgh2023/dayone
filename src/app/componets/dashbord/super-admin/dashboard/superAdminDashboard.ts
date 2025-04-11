export interface CompaniesSummaryType {
    id: number;
    name: string;
    caption: string;
    img: string;
    email: string;
    status: string
    statusText: string;
    description:any
}

export const CompaniesSummaryData: CompaniesSummaryType[] = [
    {id: 1, name: 'Abcd Pvt Ltd', img: './assets/images/files/company/img1.png',description:'', caption: '12-01-2021', email: 'julia@gmail.com', status: 'success', statusText: 'Active'},
    {id: 2, name: 'Croport Pvt Ltd', img: './assets/images/files/company/img2.png', description:'', caption: '05-02-2021', email: 'daine@gmail.com', status: 'success', statusText: 'Active'},
    {id: 3, name: 'kolit Pvt Ltd', img: './assets/images/files/company/img4.png', description:'', caption: '21-01-2021', email: 'gabrielle@gmail.com', status: 'success', statusText: 'Active'},
    {id: 4, name: 'Movck Pvt Ltd', img: './assets/images/files/company/img5.png',description:'',  caption: '16-11-2020', email: 'ryan@gmail.com', status: 'success', statusText: 'Active'},
    {id: 5, name: 'Loki Pvt Ltd', img: './assets/images/files/company/img6.png',description:'', caption: '25-06-2021', email: 'lisa@gmail.com', status: 'success', statusText: 'Active'},
]

export interface InactiveCompaniesType {
    id: number;
    name: string;
    caption: string;
    img: string;
    email: string;
    status: string
    statusText: string;
    description:any
}

export const InactiveCompaniesData: InactiveCompaniesType[] = [
    {id: 1, name: 'Kloki Pvt Ltd', img: './assets/images/files/company/img6.png', description:'',caption: '21-08-2021', email: 'james@gmail.com', status: 'danger', statusText: 'Inactive'},
    {id: 2, name: 'frecho Pvt Ltd', img: './assets/images/files/company/img7.png', description:'',caption: '16-02-2021', email: 'pippa@gmail.com', status: 'danger', statusText: 'Active'},
    {id: 3, name: 'Mooke Pvt Ltd', img: './assets/images/files/company/img8.png',description:'', caption: '21-05-2021', email: 'samgray@gmail.com', status: 'danger', statusText: 'Active'},
    {id: 4, name: 'Foklali Pvt Ltd', img: './assets/images/files/company/img2.png',description:'', caption: '21-08-2020', email: 'samgray@gmail.com', status: 'danger', statusText: 'Active'},
    {id: 5, name: 'Gomalik Pvt Ltd', img: './assets/images/files/company/img5.png',description:'', caption: '25-06-2020', email: 'lisa@gmail.com', status: 'danger', statusText: 'Active'},
]