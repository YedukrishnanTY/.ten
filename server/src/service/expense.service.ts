import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Expense, ExpenseDocument } from "../schemas/expense.schema";
import { AccountService } from "./account.service";

@Injectable()
export class ExpenseService {
    constructor(
        @InjectModel(Expense.name) private readonly expenseDocument: Model<ExpenseDocument>,
        @Inject(forwardRef(() => AccountService))
        private readonly accountService: AccountService,
    ) { }
    async getAllExpense() {
        return this.expenseDocument.find().exec();
    }
    async getExpenseByUserName(payload: { userName: string }) {
        const { userName } = payload;
        return this.expenseDocument.find({ username: userName }).exec();
    }
    async createExpense(payload: { category_id: string, expenseAmount: number } & Partial<Expense>) {
        const accountFind = await this.accountService.getAccountById(payload.category_id);
        console.log(accountFind, 'accountFind')
        const account = accountFind?.[0];
        if (!account) {
            throw new Error("Account not found");
        }
        const prevAmount = Number(account.expenseAmount) || 0;
        const currentExpense = Number(payload.expenseAmount) || 0;

        const payloadForAccount = {
            _id: payload.category_id,
            expenseAmount: prevAmount + currentExpense,
        };
        const updateExpense = await this.accountService.updateAccount(payloadForAccount)
        const created = new this.expenseDocument(payload);
        return created.save();
    }
}
