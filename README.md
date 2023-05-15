# Image Gallery

## Website Demo

https://vue-galley-yuzuxpic.firebaseapp.com/home

## Introduction

This is an image gallery website where you can browse all the photos and view them in detail through a lightbox. The site is designed and built from scratch by me, including layout design, route planning, database design, style design, and more.

One of the key features of this project is its dynamic photo loading design. You can freely replace or add photos on the site by following the replacement rules provided below.

## Features

### For users:

- Browse all photos: Navigate through all the images available on the website.
- Lightbox feature: Click on any image to view it in more detail in a lightbox overlay.

### For admin:

- Dynamic photo loading: Easily replace or add photos according to the provided rules.

## Tech Stack

firebase@9.21.0
vue@2.6.14
vue-router@3.5.1
vuex@3.6.2
vue-cool-lightbox@2.7.5
bootstrap@5.1.3

## Installation

1. Please ensure that you have node.js and npm installed.
2. Clone the project from Github to your local machine.
3. After opening it locally, navigate to the folder via the terminal and enter:

```bash
npm install
```

4. Once the installation is complete, continue by typing:

```bash
npm run serve
```

5. If you see the following message, it means it's running successfully:

```bash
 Compiled successfully

 App running at:
- Local:   http://localhost:8080/
- Network: http://172.20.10.4:8080/
```

6. Next, copy the Local address and paste it into your browser to start development.

7. If you want to stop the program, enter:

```bash
ctrl + c
```

8. Minifies for production when you finished development:

```
npm run build
```

## How to Replace or Add Photos

1. Prepare Your Album Folder
   Begin by creating a new album folder (for example, an "Album1" folder) and placing all the photos you want to display for this album into it. Next, select a cover photo for this album. In the "Album1" folder, create another folder named "cover" and place your chosen cover photo into the "cover" folder. Please note that your cover photo should be a jpg file and named "cover.jpg".

2. Place the Album Folder into the Project
   Follow the directory structure outlined below to place your album folder into the project folder:
   Project Root Folder -> src folder -> assets folder -> images folder -> album folder -> "Album1" folder -> All image files

3. Update the Album Settings of the Project
   Open the defaultSetting.js file in the utils folder and update all your series and album names following this rule: {'Series Name': ['Album Name']}.
   For example: {'Series1':['Album1', 'Album2'], 'Series2':['Album1', 'Album2', 'Album3']}
