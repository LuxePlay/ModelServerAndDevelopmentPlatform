// API服务用于与后端通信
const API_BASE_URL = '/api'; // 移除/api前缀

interface Page {
  id: number;
  name: string;
  label: string;
  visible: boolean;
  description?: string;
  order: number;
  parentId?: number;
  roles: Role[];
}

interface Role {
  id: number;
  name: string;
  description: string;
}

class ApiService {
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private async request(url: string, options: RequestInit = {}): Promise<Response> {
    const token = this.getToken();
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...defaultOptions,
      ...options,
    });
    
    // 检查响应是否为 JSON 格式
    const contentType = response.headers.get('content-type');
    if (contentType && !contentType.includes('application/json')) {
      // 如果不是 JSON，抛出更具体的错误
      const text = await response.text();
      throw new Error(`服务器返回了非 JSON 响应: ${text.substring(0, 100)}...`);
    }

    return response;
  }

  // 获取所有页面
  async getPages(): Promise<Page[]> {
    try {
      const response = await this.request('/pages');
      if (!response.ok) {
        throw new Error(`获取页面失败: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('获取页面时出错:', error);
      throw error;
    }
  }

  // 切换页面可见性
  async togglePageVisibility(pageId: number, visible: boolean): Promise<Page> {
    try {
      const response = await this.request(`/pages/${pageId}/visible`, {
        method: 'PUT',
        body: JSON.stringify({ visible }),
      });
      
      if (!response.ok) {
        throw new Error(`更新页面可见性失败: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('更新页面可见性时出错:', error);
      throw error;
    }
  }

  // 更新页面角色
  async updatePageRoles(pageId: number, roleIds: number[]): Promise<Page> {
    try {
      const response = await this.request(`/pages/${pageId}/roles`, {
        method: 'PUT',
        body: JSON.stringify({ roleIds }),
      });
      
      if (!response.ok) {
        throw new Error(`更新页面角色失败: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('更新页面角色时出错:', error);
      throw error;
    }
  }

  // 获取所有角色
  async getRoles(): Promise<Role[]> {
    try {
      const response = await this.request('/roles');
      if (!response.ok) {
        throw new Error(`获取角色失败: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('获取角色时出错:', error);
      throw error;
    }
  }
}

export default new ApiService();