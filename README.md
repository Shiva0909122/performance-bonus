### GitHub Short Description

> **Performance Bonus Calculator** — A responsive HTML, CSS & JavaScript web app that calculates GAP-based performance bonus using PV, Level %, BV, and a dynamic 6-leg network structure.

### GitHub README Description

# 💰 Performance Bonus Calculator

A simple and interactive **Performance Bonus Calculator** built using **HTML, CSS, and JavaScript**. The application helps users calculate estimated GAP-based performance bonus by entering their **PV, Level %, BV, and six-leg network details**.

## 🚀 Features

* 📊 Dynamic **6-Leg Network Structure**
* 👤 Your Level % and PV
* 💼 Individual PV and Level % for each leg
* 🧮 Automatic **GAP % calculation**
* 💰 Individual leg income calculation
* 📈 Total Performance Bonus calculation
* 💾 Save & Load calculations using LocalStorage
* 📥 Export calculation as CSV
* 🖨️ Print / Save as PDF
* 🌙 Dark Mode
* 📱 Responsive design for mobile and desktop
* 🔄 Reset calculator
* ⚡ Real-time calculations

## 🧮 Calculation Formula

### Own Income

```text
Own Income = Your PV × Your Level % × BV
```

### GAP Percentage

```text
GAP % = Your Level % − Leg Level %
```

### Leg Income

```text
Leg Income = Leg PV × GAP % × BV
```

### Total Performance Bonus

```text
Total PB = Own Income + Total Leg GAP Income
```

## 🏗️ Technology Stack

* **HTML5**
* **CSS3**
* **JavaScript**
* **LocalStorage**
* **Responsive Web Design**

## 📁 Project Structure

```text
performance-bonus-calculator/
│
├── index.html
├── style.css
└── script.js
```

## 📌 Example

For:

```text
Your Level = 16%
Your PV    = 550
BV         = 20
```

And:

```text
Leg 1 = 440 PV @ 12%
Leg 2 = 450 PV @ 5%
Leg 3 = 300 PV @ 8%
```

The calculator produces the corresponding GAP-income breakdown and estimated total.

## ⚠️ Disclaimer

This project is intended for **educational and calculation purposes**. Actual business payouts may depend on the applicable compensation plan, eligibility requirements, adjustments, taxes, and other company rules. Always verify official calculations before relying on the result.

## 👨‍💻 Author

**Shivarth Dronachary**

Entrepreneur | Web Developer | MBA Student

### ⭐ GitHub tagline

> **Calculate smarter. Understand your PV. Visualize your 6-leg structure.** 🚀
