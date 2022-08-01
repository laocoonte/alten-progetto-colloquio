import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ThemeEnum } from 'src/app/enum/theme.enum';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  form = this.fb.group({
    theme: []
  })
  themeEnum = ThemeEnum;
  constructor(private fb: FormBuilder, private themeService: ThemeService) { }

  ngOnInit(): void {
    const theme = this.themeService.getCurrentTheme();
    this.form.get('theme')?.setValue(theme);
  }

  save() {
    const {theme} = this.form.value;
    this.themeService.changeTheme(theme);
  }
}
