export const checklistNextDueDateUtil = (checklistFrequency, lastChecklistUpdate) => {
    switch (checklistFrequency) {
        case 'daily':
            return new Date(lastChecklistUpdate.getFullYear(), lastChecklistUpdate.getMonth(),lastChecklistUpdate.getDate() + 1)
        case 'weekly':
            return new Date(lastChecklistUpdate.getFullYear(), lastChecklistUpdate.getMonth(),lastChecklistUpdate.getDate() + 7)
        case 'biweekly':
            return new Date(lastChecklistUpdate.getFullYear(), lastChecklistUpdate.getMonth(),lastChecklistUpdate.getDate() + 14)
        case 'monthly':
            return new Date(lastChecklistUpdate.getFullYear(), lastChecklistUpdate.getMonth(),lastChecklistUpdate.getDate() + 30)
        case 'quaterly':
            return new Date(lastChecklistUpdate.getFullYear(), lastChecklistUpdate.getMonth(),lastChecklistUpdate.getDate() + 91)
        case 'semi-annual':
            return new Date(lastChecklistUpdate.getFullYear(), lastChecklistUpdate.getMonth(),lastChecklistUpdate.getDate() + 182)
        case 'annual':
            return new Date(lastChecklistUpdate.getFullYear(), lastChecklistUpdate.getMonth(),lastChecklistUpdate.getDate() + 365)
        case 'unspecified frequency':
            return new Date(lastChecklistUpdate.getFullYear(), lastChecklistUpdate.getMonth(),lastChecklistUpdate.getDate() + 30)
        default:
            return new Date(lastChecklistUpdate.getFullYear(), lastChecklistUpdate.getMonth(),lastChecklistUpdate.getDate() + 30)
    }
}
