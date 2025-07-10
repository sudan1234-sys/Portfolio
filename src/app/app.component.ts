import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AfterViewInit , ViewChild , ElementRef } from '@angular/core';
import { StarbackgroundComponent } from "./starbackground/starbackground.component";
import { HoverDirective } from './hover.directive';
import { AnimateOnScrollDirective, SCROLL_ANIMATIONS } from './animate-on-scroll.directive';
import emailjs from '@emailjs/browser';
    import { FormsModule } from '@angular/forms';



const projects=[{
  title: 'Real Estate Project',
  description: 'Built a full-stack property posting and bidding platform with real-time updates.',
  image: 'icons/Screenshot 2025-07-10 080424.png',
  link: 'https://real-estate-8i16.vercel.app/',
  tags:['Angular','Spring Boot','Docker'],
  },
{
  title: 'Ecomerce Project',
  description: 'Developed an Angular frontend integrating FakeStore API ,Implemented category...',
  image: 'icons/Screenshot 2025-07-10 082322.png',
  link: 'https://ecommerce-application-q2t4.vercel.app/' ,
  tags:['Angular','Angular Material','Docker'],
},

 ]
@Component({
  selector: 'app-root',
  imports: [CommonModule, StarbackgroundComponent,HoverDirective,AnimateOnScrollDirective,FormsModule],
  animations: SCROLL_ANIMATIONS,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  currentYear = new Date().getFullYear();
  
  socialLinks = [
    { name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/sudan1234-sys', color: '#6e5494' },
    { name: 'Gmail', icon: 'fab fa-google', url: 'mailto:sudanrawat59@gmail.com', color: '#ea4335' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/sudan-rawat-71a366331/', color: '#0077b5' }
  ];

  quickLinks = [
    { name: 'About', url: '#about' },
    { name: 'Projects', url: '#projects' },
    { name: 'Skills', url: '#skills' },
    { name: 'Contact', url: '#contact' }
  ];

  contactInfo = [
    { icon: 'fas fa-map-marker-alt', text: 'India,Uttarakhand,Rishikesh' },
    { icon: 'fas fa-envelope', text: 'sudanrawat59@gmail.com' },
    { icon: 'fas fa-phone', text: '+91 8865824427' }
  ];
  title = 'Portfolio';
  projects=projects;
  displayedtext='';
  fulltext='Full Stack Developer | Angular, Spring Boot, Docker';
  ishovered: boolean [] = [false,false,false,false,false,false,false,false,false,false,false,false];
  userName = '';
  userEmail = '';
  userMessage = '';
  constructor() {
  
}
  ngAfterViewInit(): void {
   const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
         this.startTyping();
          
        }
      });
    });
   
    observer.observe(document.querySelector('.heroo')!);
  }
  startTyping() {
    this.displayedtext='';
  let i = 0;
  const interval = setInterval(() => {
    this.displayedtext += this.fulltext[i];
    i++;

    if (i >= this.fulltext.length) {
      clearInterval(interval); // stop when done
    }
  }, 100); // adjust speed here (ms per letter)
  }
   onHoverChange(state: boolean , index: number) {
    this.ishovered[index] = state;
    
  }
sendEmail(){
  const templateParams = {
  name: this.userName,
  email: this.userEmail,
  message: this.userMessage,
  title: 'Portfolio Contact Form' // You can hardcode or generate this
};
 emailjs.send('service_ivrkh9o', 'template_duk0cvc', templateParams, '0mew8rRh77hIC78Hb')
    .then((res) => {
      console.log('SUCCESS!', res.status, res.text);
      alert('Email sent!');
      this.userName = '';
      this.userEmail = '';
      this.userMessage = '';
    }, (err) => {
      console.log('FAILED...', err);
      alert('Email failed.');
    });
}
}
