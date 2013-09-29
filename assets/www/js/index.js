Ext.application({
    /**
     * The launch function is called when the browser and the framework is ready
     * for the application to launch.
     *
     * All we are going to do is create a simple tabpanel with some items, and add
     * it to the global Ext.Viewport instance.
     */
    launch: function() {
        //we send a config block into the Ext.Viewport.add method which will
        //create our tabpanel
        Ext.Viewport.add({
            //first we define the xtype, which is tabpanel for the Tab Panel component
            xtype: 'tabpanel',

            //now we specify the tabBar configuration and give it a docked property of bottom
            //this will dock the tabbar of this tabpanel to the bottom

            tabBar: {
                // Dock it to the bottom
                docked: 'bottom',

                // Change the layout so each of the tabs are centered vertically and horizontally
                layout: {
                    pack: 'center',
                    align: 'center'
                },

                // Make the tabbar scrollable horizontally, and disabled the indicators
                scrollable: {
                    direction: 'horizontal',
                    indicators: false
                }
            },

            //here we specify the ui of the tabbar to light
            ui: 'light',

            //defaults allow us to add default configuratons for each of the items added into
            //this container. adding scrollable true means that all items in this tabpanel will
            //be scrollable unless otherwise specified in the item configuration
            defaults: {
                scrollable: true
            },

            layout: {
                animation: false
            },

            //next we define the items that will appear inside our tab panel
            items: [{
                title: 'About',
                html: 'about',
                iconCls: 'info',
                cls: 'card1'
            },{
                title: '一卡通',
                html: '<h1>Favorites Card</h1>',
                iconCls: 'card',
                cls: 'card2',
                badgeText: '4'
            },{
                title: '成绩',
                html: '<h1>Downloads Card</h1>',
                iconCls: 'score',
                cls: 'card3',
            },{
            	title: '同学们',
            	html: '<h1>Settings Card</h1>',
            	iconCls: 'team',
            	cls: 'card4'
            },{
                title: '讨论区',
                html: '<h1>Settings Card</h1>',
                iconCls: 'talk',
                cls: 'card4'
            },{
                title: 'User',
                html: '<h1>User Card</h1>',
                iconCls: 'user',
                cls: 'card5'
            }]
        });
    }
});
