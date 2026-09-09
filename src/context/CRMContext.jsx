import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_LEADS, INITIAL_VISITS, INITIAL_TASKS, CRM_STAGES } from '../data/initialCrmData';

const CRMContext = createContext(null);

const STORAGE_KEYS = {
  LEADS: 'avm_crm_leads_v2',
  VISITS: 'avm_crm_visits_v2',
  TASKS: 'avm_crm_tasks_v2',
};

export const CRMProvider = ({ children }) => {
  // Initialize Leads
  const [leads, setLeads] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading CRM leads from storage:', e);
    }
    return INITIAL_LEADS;
  });

  // Initialize Site Visits
  const [siteVisits, setSiteVisits] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VISITS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading CRM visits from storage:', e);
    }
    return INITIAL_VISITS;
  });

  // Initialize Tasks
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading CRM tasks from storage:', e);
    }
    return INITIAL_TASKS;
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
    } catch (e) {
      console.error('Error saving CRM leads:', e);
    }
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(siteVisits));
    } catch (e) {
      console.error('Error saving CRM visits:', e);
    }
  }, [siteVisits]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (e) {
      console.error('Error saving CRM tasks:', e);
    }
  }, [tasks]);

  // Add new lead (can be triggered from website forms or CRM modal)
  const addLead = (leadData) => {
    const newId = `lead-${Date.now()}`;
    const timestamp = new Date().toISOString();
    const newLead = {
      id: newId,
      name: leadData.name || 'Anonymous Investor',
      phone: leadData.phone || '',
      email: leadData.email || '',
      city: leadData.city || 'Jaipur',
      corridor: leadData.corridor || 'Ajmer Road & Tech Corridor (NH-48)',
      plotId: leadData.plotId || '',
      plotName: leadData.plotName || (leadData.plotId ? 'Verified Plotted Estate' : 'General Inquiry'),
      budgetLakhs: Number(leadData.budgetLakhs) || 50,
      plotSizeGaj: Number(leadData.plotSizeGaj) || 200,
      stage: leadData.stage || 'new',
      priority: leadData.priority || 'hot',
      source: leadData.source || 'Website Form',
      coordinatorAssigned: leadData.coordinatorAssigned || 'Abhishek Khandelwal ji',
      createdAt: timestamp,
      lastContacted: null,
      notes: leadData.notes || '',
      activities: [
        {
          id: `act-${Date.now()}`,
          type: 'inquiry',
          text: `Lead captured via ${leadData.source || 'Website Form'} for ${leadData.plotName || leadData.corridor || 'Plotted Inquiry'}`,
          timestamp,
        },
        ...(leadData.initialActivity ? [leadData.initialActivity] : []),
      ],
    };

    setLeads((prev) => [newLead, ...prev]);
    return newLead;
  };

  // Update existing lead
  const updateLead = (leadId, updates) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== leadId) return lead;

        const updatedActivities = [...(lead.activities || [])];

        // If stage changed, log automatic activity
        if (updates.stage && updates.stage !== lead.stage) {
          const oldStageObj = CRM_STAGES.find((s) => s.id === lead.stage);
          const newStageObj = CRM_STAGES.find((s) => s.id === updates.stage);
          updatedActivities.unshift({
            id: `act-${Date.now()}`,
            type: 'stage',
            text: `Pipeline stage moved from "${oldStageObj?.labelEn || lead.stage}" to "${newStageObj?.labelEn || updates.stage}"`,
            timestamp: new Date().toISOString(),
          });
        }

        return {
          ...lead,
          ...updates,
          activities: updatedActivities,
          lastContacted: updates.lastContacted || lead.lastContacted,
        };
      })
    );
  };

  // Quick stage transition (for Kanban drag / drop or 1-click movement)
  const changeLeadStage = (leadId, newStage, note = '') => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== leadId) return lead;
        const oldStageObj = CRM_STAGES.find((s) => s.id === lead.stage);
        const newStageObj = CRM_STAGES.find((s) => s.id === newStage);

        const newActivity = {
          id: `act-${Date.now()}`,
          type: 'stage',
          text: note
            ? `Stage changed to "${newStageObj?.labelEn}": ${note}`
            : `Advanced stage from "${oldStageObj?.labelEn || lead.stage}" to "${newStageObj?.labelEn || newStage}"`,
          timestamp: new Date().toISOString(),
        };

        return {
          ...lead,
          stage: newStage,
          activities: [newActivity, ...(lead.activities || [])],
        };
      })
    );
  };

  // Delete lead
  const deleteLead = (leadId) => {
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
    // Also cleanup linked visits
    setSiteVisits((prev) => prev.filter((v) => v.leadId !== leadId));
    setTasks((prev) => prev.filter((t) => t.leadId !== leadId));
  };

  // Add custom manual activity note to a lead
  const addActivity = (leadId, activity) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== leadId) return lead;
        const newAct = {
          id: `act-${Date.now()}`,
          type: activity.type || 'note',
          text: activity.text,
          timestamp: new Date().toISOString(),
        };
        return {
          ...lead,
          lastContacted: new Date().toISOString(),
          activities: [newAct, ...(lead.activities || [])],
        };
      })
    );
  };

  // Site Visits Management
  const scheduleVisit = (visitData) => {
    const newVisitId = `visit-${Date.now()}`;
    const newVisit = {
      id: newVisitId,
      leadId: visitData.leadId || '',
      leadName: visitData.leadName || 'VIP Client',
      phone: visitData.phone || '',
      date: visitData.date || new Date().toISOString().split('T')[0],
      timeSlot: visitData.timeSlot || 'Morning (10:30 AM)',
      pickupLocation: visitData.pickupLocation || 'Jaipur International Airport',
      corridor: visitData.corridor || 'Ajmer Road & Tech Corridor (NH-48)',
      vehicle: visitData.vehicle || 'Executive SUV (Toyota Fortuner)',
      coordinator: visitData.coordinator || 'Abhishek Khandelwal ji',
      status: visitData.status || 'scheduled',
      notes: visitData.notes || '',
    };

    setSiteVisits((prev) => [newVisit, ...prev]);

    // If linked to lead, record activity and advance stage if needed
    if (visitData.leadId) {
      addActivity(visitData.leadId, {
        type: 'visit',
        text: `VIP Site Inspection scheduled for ${newVisit.date} (${newVisit.timeSlot}) at ${newVisit.pickupLocation}`,
      });
      // Automatically advance to site_visit stage if currently new or contacted
      setLeads((prev) =>
        prev.map((l) => {
          if (l.id === visitData.leadId && (l.stage === 'new' || l.stage === 'contacted')) {
            return { ...l, stage: 'site_visit' };
          }
          return l;
        })
      );
    }

    return newVisit;
  };

  const updateVisitStatus = (visitId, status) => {
    setSiteVisits((prev) =>
      prev.map((v) => (v.id === visitId ? { ...v, status } : v))
    );
  };

  const deleteVisit = (visitId) => {
    setSiteVisits((prev) => prev.filter((v) => v.id !== visitId));
  };

  // Tasks Management
  const addTask = (taskData) => {
    const newTask = {
      id: `task-${Date.now()}`,
      leadId: taskData.leadId || null,
      leadName: taskData.leadName || 'General Follow-up',
      title: taskData.title,
      dueDate: taskData.dueDate || new Date().toISOString().split('T')[0],
      priority: taskData.priority || 'medium',
      assignedTo: taskData.assignedTo || 'Abhishek Khandelwal ji',
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Export to CSV
  const exportLeadsCSV = () => {
    const headers = [
      'Lead ID',
      'Full Name',
      'Phone',
      'Email',
      'City',
      'Corridor of Interest',
      'Plot / Scheme',
      'Budget (₹ Lakhs)',
      'Plot Size (Gaj)',
      'Stage',
      'Priority',
      'Lead Source',
      'Assigned Coordinator',
      'Created At',
      'Notes',
    ];

    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.city}"`,
      `"${l.corridor}"`,
      `"${l.plotName}"`,
      l.budgetLakhs,
      l.plotSizeGaj,
      `"${l.stage}"`,
      `"${l.priority}"`,
      `"${l.source}"`,
      `"${l.coordinatorAssigned}"`,
      `"${l.createdAt}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `AVM_Talks_CRM_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Full JSON Backup
  const exportFullJSON = () => {
    const data = {
      exportDate: new Date().toISOString(),
      leads,
      siteVisits,
      tasks,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `AVM_CRM_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Import JSON Backup
  const importJSON = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (Array.isArray(data.leads)) setLeads(data.leads);
      if (Array.isArray(data.siteVisits)) setSiteVisits(data.siteVisits);
      if (Array.isArray(data.tasks)) setTasks(data.tasks);
      return { success: true };
    } catch (e) {
      console.error('Import failed:', e);
      return { success: false, error: e.message };
    }
  };

  // Reset to default seed
  const resetToDefaultSeed = () => {
    setLeads(INITIAL_LEADS);
    setSiteVisits(INITIAL_VISITS);
    setTasks(INITIAL_TASKS);
    localStorage.removeItem(STORAGE_KEYS.LEADS);
    localStorage.removeItem(STORAGE_KEYS.VISITS);
    localStorage.removeItem(STORAGE_KEYS.TASKS);
  };

  // Computed Live CRM Metrics
  const metrics = useMemo(() => {
    const total = leads.length;
    const totalPipelineLakhs = leads.reduce((acc, l) => acc + (Number(l.budgetLakhs) || 0), 0);
    const pipelineValueCrores = (totalPipelineLakhs / 100).toFixed(2);
    const closed = leads.filter((l) => l.stage === 'closed').length;
    const hotCount = leads.filter((l) => l.priority === 'hot').length;
    const visitsCount = siteVisits.length;
    const pendingTasks = tasks.filter((t) => !t.completed).length;
    const conversionRate = total > 0 ? ((closed / total) * 100).toFixed(1) : 0;

    // Corridor Breakdown
    const corridorCounts = {};
    leads.forEach((l) => {
      const c = l.corridor || 'Other';
      corridorCounts[c] = (corridorCounts[c] || 0) + 1;
    });

    // Stage counts
    const stageCounts = {};
    CRM_STAGES.forEach((s) => {
      stageCounts[s.id] = leads.filter((l) => l.stage === s.id).length;
    });

    return {
      totalLeads: total,
      pipelineValueCrores,
      closedDeals: closed,
      hotLeadsCount: hotCount,
      siteVisitsCount: visitsCount,
      pendingTasks,
      conversionRate,
      corridorCounts,
      stageCounts,
    };
  }, [leads, siteVisits, tasks]);

  return (
    <CRMContext.Provider
      value={{
        leads,
        siteVisits,
        tasks,
        metrics,
        addLead,
        updateLead,
        deleteLead,
        changeLeadStage,
        addActivity,
        scheduleVisit,
        updateVisitStatus,
        deleteVisit,
        addTask,
        toggleTask,
        deleteTask,
        exportLeadsCSV,
        exportFullJSON,
        importJSON,
        resetToDefaultSeed,
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};
