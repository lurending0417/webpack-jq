/**
 * 创建navBar
 * @param parentDom: 包裹navBar的父元素(jquery对象)
 */
export default function createNavBar(parentDom) {
    let navBar = '';
    let navBarConfig = [{
        title: '财务系统',
        child: [{
            title: '财务报表'
        }, {
            title: '统计报表'
        }]
    }, {
        title: '协同办公系统',
        child: [{
            title: '权限管理'
        }, {
            title: '配置'
        }]
    }, {
        title: '营销管理系统',
        child: [{
            title: '财务报表'
        }, {
            title: '统计报表'
        }]
    }, {
        title: '稽查系统',
        child: [{
            title: '权限管理'
        }, {
            title: '配置'
        }]
    }, {
        title: '经销商管理系统',
        child: [{
            title: '财务报表'
        }, {
            title: '统计报表'
        }]
    }];
    navBarConfig.forEach(item => {
        let child = '<ul>';
        item.child.forEach(childItem => {
            child += `<li>${childItem.title}</li>`
        });
        child += '</ul>';
        navBar += `<a href="" class="nav-item-wrap">
                <span>${item.title}</span>
                <div class="subnav-list-wrap">
                    <div class="subnav-item-wrap">
                        <h5>子菜单名称</h5>
                        ${child}
                    </div>
                </div>
            </a>`
    })
    parentDom.append(navBar)
}