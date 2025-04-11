import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';


@Component({
  selector: 'app-general-settings',
  standalone: true,
  imports: [NgbModule, SharedModule, NgSelectModule, FormsModule, ReactiveFormsModule, RouterModule, ColorPickerModule],
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {
  public color: string = '#2889e9';
  constructor() { }

  ngOnInit(): void {
  }

  AdminPanelLanguage = [
    {
      id: 1,
      name: 'Afrikanns',
      value: 'AF'
    },
    {
      id: 2,
      name: 'Albanian',
      value: 'SQ'
    },
    {
      id: 3,
      name: 'Arabic',
      value: 'AR'
    },
    {
      id: 4,
      name: 'Armenian',
      value: 'HY'
    },
    {
      id: 5,
      name: 'Basque',
      value: 'EU'
    },
    {
      id: 6,
      name: 'Bengali',
      value: 'BN'
    },
    {
      id: 7,
      name: 'Bulgarian',
      value: 'BG'
    },
    {
      id: 8,
      name: 'Catalan',
      value: 'CA'
    },
    {
      id: 9,
      name: 'Cambodian',
      value: 'KM'
    },
    {
      id: 10,
      name: 'Chinese (Mandarin)',
      value: 'ZH'
    },
    {
      id: 11,
      name: 'Croation',
      value: 'HR'
    },
    {
      id: 12,
      name: 'Czech',
      value: 'CS'
    },
    {
      id: 13,
      name: 'Danish',
      value: 'DA'
    },
    {
      id: 14,
      name: 'Dutch',
      value: 'NL'
    },
    {
      id: 15,
      name: 'English',
      value: 'EN'
    },
    {
      id: 16,
      name: 'Estonian',
      value: 'ET'
    },
    {
      id: 17,
      name: 'Fiji',
      value: 'FJ'
    },
    {
      id: 18,
      name: 'Finnish',
      value: 'FI'
    },
    {
      id: 19,
      name: 'French',
      value: 'FR'
    },
    {
      id: 20,
      name: 'Georgian',
      value: 'KA'
    },
    {
      id: 21,
      name: 'German',
      value: 'DE'
    },
    {
      id: 22,
      name: 'Greek',
      value: 'EL'
    },
    {
      id: 23,
      name: 'Gujarati',
      value: 'GU'
    },
    {
      id: 24,
      name: 'Hebrew',
      value: 'HE'
    },
    {
      id: 25,
      name: 'Hindi',
      value: 'HI'
    },
    {
      id: 26,
      name: 'Hungarian',
      value: 'HU'
    },
    {
      id: 27,
      name: 'Icelandic',
      value: 'IS'
    },
    {
      id: 28,
      name: 'Indonesian',
      value: 'ID'
    },
    {
      id: 29,
      name: 'Irish',
      value: 'GA'
    },
    {
      id: 30,
      name: 'Italian',
      value: 'IT'
    },
    {
      id: 31,
      name: 'Japanese',
      value: 'JA'
    },
    {
      id: 32,
      name: 'Javanese',
      value: 'JW'
    },
    {
      id: 33,
      name: 'Korean',
      value: 'KO'
    },
    {
      id: 34,
      name: 'Latin',
      value: 'LA'
    },
    {
      id: 35,
      name: 'Latvian',
      value: 'LV'
    },
    {
      id: 36,
      name: 'Lithuanian',
      value: 'LT'
    },
    {
      id: 37,
      name: 'Macedonian',
      value: 'MK'
    },
    {
      id: 38,
      name: 'Malay',
      value: 'MS'
    },
    {
      id: 39,
      name: 'Malayalam',
      value: 'ML'
    },
    {
      id: 40,
      name: 'Maltese',
      value: 'MT'
    },
    {
      id: 41,
      name: 'Maori',
      value: 'MI'
    },
    {
      id: 42,
      name: 'Marathi',
      value: 'MR'
    },
    {
      id: 43,
      name: 'Mongolian',
      value: 'MN'
    },
    {
      id: 44,
      name: 'Nepali',
      value: 'NE'
    },
    {
      id: 45,
      name: 'Norwegian',
      value: 'NO'
    },
    {
      id: 46,
      name: 'Persian',
      value: 'FA'
    },
    {
      id: 47,
      name: 'Polish',
      value: 'PL'
    },
    {
      id: 48,
      name: 'Portuguese',
      value: 'PT'
    },
    {
      id: 49,
      name: 'Punjabi',
      value: 'PA'
    },
    {
      id: 50,
      name: 'Quechua',
      value: 'QU'
    },
    {
      id: 51,
      name: 'Romanian',
      value: 'RO'
    },
    {
      id: 52,
      name: 'Russian',
      value: 'RU'
    },
    {
      id: 53,
      name: 'Samoan',
      value: 'SM'
    },
    {
      id: 54,
      name: 'Serbian',
      value: 'SR'
    },
    {
      id: 55,
      name: 'Slovak',
      value: 'SK'
    },
    {
      id: 56,
      name: 'Slovenian',
      value: 'SL'
    },
    {
      id: 57,
      name: 'Spanish',
      value: 'ES'
    },
    {
      id: 58,
      name: 'Swahili',
      value: 'SW'
    },
    {
      id: 59,
      name: 'Swedish',
      value: 'SV'
    },
    {
      id: 60,
      name: 'Tamil',
      value: 'TA'
    },
    {
      id: 61,
      name: 'Tatar',
      value: 'TT'
    },
    {
      id: 62,
      name: 'Telugu',
      value: 'TE'
    },
    {
      id: 63,
      name: 'Thai',
      value: 'TH'
    },
    {
      id: 64,
      name: 'Tibetan',
      value: 'BO'
    },
    {
      id: 65,
      name: 'Tonga',
      value: 'TO'
    },
    {
      id: 66,
      name: 'Turkish',
      value: 'TR'
    },
    {
      id: 67,
      name: 'Ukranian',
      value: 'UK'
    },
    {
      id: 68,
      name: 'Urdu',
      value: 'UR'
    },
    {
      id: 69,
      name: 'Uzbek',
      value: 'UZ'
    },
    {
      id: 70,
      name: 'Vietnamese',
      value: 'VI'
    },
    {
      id: 71,
      name: 'Welsh',
      value: 'CY'
    },
    {
      id: 72,
      name: 'Xhosa',
      value: 'XH'
    },
  ]
  selectedAdminPanel = this.AdminPanelLanguage[0].name
  SitePanelLanguage =[
      {
        id: 1,
        name: 'Afrikanns',
        value: 'AF'
      },
      {
        id: 2,
        name: 'Albanian',
        value: 'SQ'
      },
      {
        id: 3,
        name: 'Arabic',
        value: 'AR'
      },
      {
        id: 4,
        name: 'Armenian',
        value: 'HY'
      },
      {
        id: 5,
        name: 'Basque',
        value: 'EU'
      },
      {
        id: 6,
        name: 'Bengali',
        value: 'BN'
      },
      {
        id: 7,
        name: 'Bulgarian',
        value: 'BG'
      },
      {
        id: 8,
        name: 'Catalan',
        value: 'CA'
      },
      {
        id: 9,
        name: 'Cambodian',
        value: 'KM'
      },
      {
        id: 10,
        name: 'Chinese (Mandarin)',
        value: 'ZH'
      },
      {
        id: 11,
        name: 'Croation',
        value: 'HR'
      },
      {
        id: 12,
        name: 'Czech',
        value: 'CS'
      },
      {
        id: 13,
        name: 'Danish',
        value: 'DA'
      },
      {
        id: 14,
        name: 'Dutch',
        value: 'NL'
      },
      {
        id: 15,
        name: 'English',
        value: 'EN'
      },
      {
        id: 16,
        name: 'Estonian',
        value: 'ET'
      },
      {
        id: 17,
        name: 'Fiji',
        value: 'FJ'
      },
      {
        id: 18,
        name: 'Finnish',
        value: 'FI'
      },
      {
        id: 19,
        name: 'French',
        value: 'FR'
      },
      {
        id: 20,
        name: 'Georgian',
        value: 'KA'
      },
      {
        id: 21,
        name: 'German',
        value: 'DE'
      },
      {
        id: 22,
        name: 'Greek',
        value: 'EL'
      },
      {
        id: 23,
        name: 'Gujarati',
        value: 'GU'
      },
      {
        id: 24,
        name: 'Hebrew',
        value: 'HE'
      },
      {
        id: 25,
        name: 'Hindi',
        value: 'HI'
      },
      {
        id: 26,
        name: 'Hungarian',
        value: 'HU'
      },
      {
        id: 27,
        name: 'Icelandic',
        value: 'IS'
      },
      {
        id: 28,
        name: 'Indonesian',
        value: 'ID'
      },
      {
        id: 29,
        name: 'Irish',
        value: 'GA'
      },
      {
        id: 30,
        name: 'Italian',
        value: 'IT'
      },
      {
        id: 31,
        name: 'Japanese',
        value: 'JA'
      },
      {
        id: 32,
        name: 'Javanese',
        value: 'JW'
      },
      {
        id: 33,
        name: 'Korean',
        value: 'KO'
      },
      {
        id: 34,
        name: 'Latin',
        value: 'LA'
      },
      {
        id: 35,
        name: 'Latvian',
        value: 'LV'
      },
      {
        id: 36,
        name: 'Lithuanian',
        value: 'LT'
      },
      {
        id: 37,
        name: 'Macedonian',
        value: 'MK'
      },
      {
        id: 38,
        name: 'Malay',
        value: 'MS'
      },
      {
        id: 39,
        name: 'Malayalam',
        value: 'ML'
      },
      {
        id: 40,
        name: 'Maltese',
        value: 'MT'
      },
      {
        id: 41,
        name: 'Maori',
        value: 'MI'
      },
      {
        id: 42,
        name: 'Marathi',
        value: 'MR'
      },
      {
        id: 43,
        name: 'Mongolian',
        value: 'MN'
      },
      {
        id: 44,
        name: 'Nepali',
        value: 'NE'
      },
      {
        id: 45,
        name: 'Norwegian',
        value: 'NO'
      },
      {
        id: 46,
        name: 'Persian',
        value: 'FA'
      },
      {
        id: 47,
        name: 'Polish',
        value: 'PL'
      },
      {
        id: 48,
        name: 'Portuguese',
        value: 'PT'
      },
      {
        id: 49,
        name: 'Punjabi',
        value: 'PA'
      },
      {
        id: 50,
        name: 'Quechua',
        value: 'QU'
      },
      {
        id: 51,
        name: 'Romanian',
        value: 'RO'
      },
      {
        id: 52,
        name: 'Russian',
        value: 'RU'
      },
      {
        id: 53,
        name: 'Samoan',
        value: 'SM'
      },
      {
        id: 54,
        name: 'Serbian',
        value: 'SR'
      },
      {
        id: 55,
        name: 'Slovak',
        value: 'SK'
      },
      {
        id: 56,
        name: 'Slovenian',
        value: 'SL'
      },
      {
        id: 57,
        name: 'Spanish',
        value: 'ES'
      },
      {
        id: 58,
        name: 'Swahili',
        value: 'SW'
      },
      {
        id: 59,
        name: 'Swedish',
        value: 'SV'
      },
      {
        id: 60,
        name: 'Tamil',
        value: 'TA'
      },
      {
        id: 61,
        name: 'Tatar',
        value: 'TT'
      },
      {
        id: 62,
        name: 'Telugu',
        value: 'TE'
      },
      {
        id: 63,
        name: 'Thai',
        value: 'TH'
      },
      {
        id: 64,
        name: 'Tibetan',
        value: 'BO'
      },
      {
        id: 65,
        name: 'Tonga',
        value: 'TO'
      },
      {
        id: 66,
        name: 'Turkish',
        value: 'TR'
      },
      {
        id: 67,
        name: 'Ukranian',
        value: 'UK'
      },
      {
        id: 68,
        name: 'Urdu',
        value: 'UR'
      },
      {
        id: 69,
        name: 'Uzbek',
        value: 'UZ'
      },
      {
        id: 70,
        name: 'Vietnamese',
        value: 'VI'
      },
      {
        id: 71,
        name: 'Welsh',
        value: 'CY'
      },
      {
        id: 72,
        name: 'Xhosa',
        value: 'XH'
      },
  ]
  selectedSitePanel = this.AdminPanelLanguage[0].name
  SelectDateFormat = [
    {
      id: 1,
      name: 'MM/DD/YY (02/25/2021)',
    },
    {
      id: 2,
      name: 'DD/MM/YY (25/02/2021)',
    },
    {
      id: 3,
      name: 'YY/MM/DD (2021/02/25)',
    },
    {
      id: 4,
      name: 'Month D, Yr (February 25, 2021)',
    },
    {
      id: 5,
      name: 'MM-DD-YY (02-25-2021)',
    },
    {
      id: 6,
      name: 'DD-MM-YY (25-02-2021)',
    },
    {
      id: 7,
      name: 'YY-MM-DD (2021-02-25))',
    },
    {
      id: 8,
      name: 'MM.DD.YY (02.25.2021)',
    },
    {
      id: 9,
      name: 'DD.MM.YY (25.02.2021)',
    },
    {
      id: 10,
      name: 'YY.MM.DD (2021.02.25)',
    },
  ]
  SelectedDateFormat = this.SelectDateFormat[0].name
  SelectTimeFormat = [
    {
      id: 1,
      name: '24H (HH:MM:SS) 22:45:10',
    },
    {
      id: 2,
      name: '24H (HH:MM) 22:34',
    },
    {
      id: 3,
      name: '12H (HH:MM:SS XM) 22:56:30 PM',
    },
    {
      id: 4,
      name: '12H (HH:MM XM) 11:43 AM',
    },
    {
      id: 5,
      name: '12H (HH:MM:SS) 12:55:38 PM',
    },
    {
      id: 6,
      name: '24H (HH:MM) 12:55',
    },
    {
      id: 7,
      name: '12H (HH:MM:SS XM) 12:55:45 PM',
    },
    {
      id: 8,
      name: '12H (HH:MM XM) 04:57 PM',
    },
  ]
  SelectedTimeFormat = this.SelectTimeFormat[0].name
  
}
