import {TransactionRecurrence} from "@/models";

export interface RecurrenceDisplay {
  fullName: string
  abbrev: string
}

export const recurrence = {
  FULL_DESCRIPTIONS: {
      [TransactionRecurrence.once]: 'Einmalig',
      [TransactionRecurrence.monthly]: 'Monatlich',
      [TransactionRecurrence.quaterly]: 'Quartalsweise',
      [TransactionRecurrence.yearly]: 'Jährlich'
    },
  ABBREVS: {
      [TransactionRecurrence.once]: 'E',
      [TransactionRecurrence.monthly]: 'M',
      [TransactionRecurrence.quaterly]: 'Q',
      [TransactionRecurrence.yearly]: 'J'
  },
  format(tr: TransactionRecurrence): RecurrenceDisplay {
    return {
      fullName: recurrence.FULL_DESCRIPTIONS[tr],
      abbrev: recurrence.ABBREVS[tr]
    }
  }
}
