modules = ["python-3.11"]
[agent]
expertMode = true

[workflows]
runButton = "Project"

[[workflows.workflow]]
name = "Project"
mode = "parallel"
author = "agent"

[[workflows.workflow.tasks]]
task = "workflow.run"
args = "Web Server"

[[workflows.workflow]]
name = "Web Server"
author = "agent"

[[workflows.workflow.tasks]]
task = "shell.exec"
args = "python3 -m http.server 5000"
waitForPort = 5000

[workflows.workflow.metadata]
outputType = "webview"

[[ports]]
localPort = 5000
externalPort = 80        ...updates,
        updatedAt: new Date().toISOString()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating item:', error);
      return { success: false, error: error.message };
    }
  },

  // Delete item
  async deleteItem(itemId) {
    try {
      const itemRef = ref(database, `inventory/${itemId}`);
      await remove(itemRef);
      return { success: true };
    } catch (error) {
      console.error('Error deleting item:', error);
      return { success: false, error: error.message };
    }
  },

  // Get item by ID
  async getItem(itemId) {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `inventory/${itemId}`));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting item:', error);
      return null;
    }
  },

  // Search items by criteria
  async searchItems(searchTerm, type = null, status = null) {
    try {
      const items = await this.getAllItems();
      return items.filter(item => {
        const matchesSearch = !searchTerm || 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.assignedTo && item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesType = !type || item.type === type;
        const matchesStatus = !status || item.status === status;
        
        return matchesSearch && matchesType && matchesStatus;
      });
    } catch (error) {
      console.error('Error searching items:', error);
      return [];
    }
  }
};

export { app, analytics, database };
