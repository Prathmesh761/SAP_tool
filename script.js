// Menu data structure matching the image
const menuItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar' },
    { id: 'feed', label: 'Feed', icon: 'rss' },
    {
        id: 'customers',
        label: 'Customers',
        icon: 'users',
        subItems: ['Accounts', 'Contacts', 'Account Hierarchy']
    },
    {
        id: 'people',
        label: 'People',
        icon: 'user',
        subItems: ['Employees', 'Delegates']
    },
    {
        id: 'sales-campaign',
        label: 'Sales Campaign',
        icon: 'megaphone',
        subItems: ['Target Groups', 'Campaigns']
    },
    {
        id: 'sales',
        label: 'Sales',
        icon: 'star',
        subItems: ['Leads', 'Opportunities', 'Sales Quotes', 'Sales Orders', 'Templates']
    },
    {
        id: 'activities',
        label: 'Activities',
        icon: 'clipboard',
        subItems: ['Appointments', 'E-Mails', 'Phone Calls', 'Tasks']
    },
    {
        id: 'analysis',
        label: 'Analysis',
        icon: 'bar-chart-3',
        subItems: ['Dashboard', 'Reports']
    },
    { id: 'competitors', label: 'Competitors', icon: 'castle' },
    { id: 'products', label: 'Products', icon: 'package' },
    {
        id: 'partners',
        label: 'Partners',
        icon: 'file-text',
        subItems: ['Partners', 'Partners Contact']
    },
    {
        id: 'visits',
        label: 'Visits',
        icon: 'user-check',
        subItems: ['Visits', 'Visit Planner', 'Routes']
    }
];

// Icon SVG paths (Lucide icons)
const iconPaths = {
    'home': 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
    'calendar': 'M3 4h18v2H3zM3 8h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8zM7 2v4M17 2v4',
    'rss': 'M4 11a9 9 0 0 1 9 9 M4 4a16 16 0 0 1 16 16 M6 20h.01',
    'users': 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
    'user': 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    'megaphone': 'M3 11l18-5v12L3 14v-3z M11.6 16.8a3 3 0 1 1-5.8-1.6',
    'star': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    'clipboard': 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2 M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z',
    'bar-chart-3': 'M3 3v18h18 M8 17V9 M13 17V5 M18 17v-3',
    'castle': 'M2 20h20 M4 20V10l4-4 4 4 4-4 4 4v10 M6 8V4h2v4 M10 8V4h2v4 M14 8V4h2v4 M18 8V4h2v4',
    'package': 'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12',
    'file-text': 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
    'user-check': 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M16 11l2 2 4-4',
    'chevron-right': 'M9 18l6-6-6-6'
};

// State management
let expandedSections = new Set();
let activeItem = 'home';

// Create SVG icon
function createIcon(iconName, className = 'menu-icon') {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', className);
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('viewBox', '0 0 24 24');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('d', iconPaths[iconName] || iconPaths['home']);
    
    svg.appendChild(path);
    return svg;
}

// Create menu item HTML
function createMenuItem(item) {
    const li = document.createElement('li');
    li.className = 'menu-item';
    
    const header = document.createElement('div');
    header.className = `menu-item-header ${activeItem === item.id ? 'active' : ''}`;
    header.setAttribute('data-item-id', item.id);
    
    const content = document.createElement('div');
    content.className = 'menu-item-content';
    
    const icon = createIcon(item.icon);
    const label = document.createElement('span');
    label.className = 'menu-label';
    label.textContent = item.label;
    
    content.appendChild(icon);
    content.appendChild(label);
    header.appendChild(content);
    
    // Add expand icon for items with sub-items
    if (item.subItems) {
        const expandIcon = createIcon('chevron-right', 'expand-icon');
        if (expandedSections.has(item.id)) {
            expandIcon.classList.add('expanded');
        }
        header.appendChild(expandIcon);
    }
    
    li.appendChild(header);
    
    // Create submenu if sub-items exist
    if (item.subItems) {
        const submenu = document.createElement('div');
        submenu.className = `submenu ${expandedSections.has(item.id) ? 'expanded' : ''}`;
        
        const submenuList = document.createElement('ul');
        submenuList.className = 'submenu-list';
        
        item.subItems.forEach(subItem => {
            const subLi = document.createElement('li');
            subLi.className = 'submenu-item';
            
            const subLink = document.createElement('div');
            const subItemId = subItem.toLowerCase().replace(/\s+/g, '-');
            subLink.className = `submenu-link ${activeItem === subItemId ? 'active' : ''}`;
            subLink.setAttribute('data-item-id', subItemId);
            subLink.textContent = subItem;
            
            subLi.appendChild(subLink);
            submenuList.appendChild(subLi);
        });
        
        submenu.appendChild(submenuList);
        li.appendChild(submenu);
    }
    
    return li;
}

// Toggle section expansion
function toggleSection(sectionId) {
    if (expandedSections.has(sectionId)) {
        expandedSections.delete(sectionId);
    } else {
        expandedSections.add(sectionId);
    }
    renderMenu();
}

// Set active item
function setActiveItem(itemId, isSubItem = false) {
    activeItem = itemId;
    
    if (isSubItem) {
        // Find parent section and keep it expanded
        const parentSection = menuItems.find(item => 
            item.subItems?.some(subItem => 
                subItem.toLowerCase().replace(/\s+/g, '-') === itemId
            )
        );
        
        if (parentSection) {
            expandedSections.add(parentSection.id);
        }
    }
    
    renderMenu();
}

// Render the entire menu
function renderMenu() {
    const menuList = document.getElementById('menuList');
    menuList.innerHTML = '';
    
    menuItems.forEach(item => {
        const menuItem = createMenuItem(item);
        menuList.appendChild(menuItem);
    });
    
    // Add event listeners
    addEventListeners();
}

// Add event listeners to menu items
function addEventListeners() {
    // Main menu item headers
    document.querySelectorAll('.menu-item-header').forEach(header => {
        header.addEventListener('click', (e) => {
            const itemId = header.getAttribute('data-item-id');
            const item = menuItems.find(item => item.id === itemId);
            
            if (item.subItems) {
                toggleSection(itemId);
            } else {
                setActiveItem(itemId);
            }
        });
    });
    
    // Submenu items
    document.querySelectorAll('.submenu-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const itemId = link.getAttribute('data-item-id');
            setActiveItem(itemId, true);
        });
    });
}

// Initialize the application
function init() {
    // Set initial active item and expanded section for Visits (as shown in image)
    activeItem = 'home';
    expandedSections.add('visits');
    
    // Render the menu
    renderMenu();
    
    console.log('RITAL Dashboard initialized successfully!');
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);