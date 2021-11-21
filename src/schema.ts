import {
  makeSchema,
  nonNull,
  objectType,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType,
} from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('allCustomers', {
      type: 'Customer',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.customer.findMany()
      },
    })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.nonNull.field('createCustomer', {
      type: 'Customer',
      args: {
        data: nonNull(
          arg({
            type: 'CustomerCreateInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.customer.create({
          data: {
            id: args.data.id,
            email: args.data.email,
            accepts_marketing: args.data.accepts_marketing,
            created_at: args.data.created_at,
            updated_at: args.data.updated_at,
            first_name: args.data.first_name,
            last_name: args.data.last_name,
            orders_count: args.data.orders_count,
            state: args.data.state,
            total_spent: args.data.total_spent,
            last_order_id: args.data.last_order_id,
            note: args.data.note,
            verified_email: args.data.verified_email,
            multipass_identifier: args.data.multipass_identifier,
            tax_exempt: args.data.tax_exempt,
            phone: args.data.phone,
            tags: args.data.tags,
            last_order_name: args.data.last_order_name,
            currency: args.data.currency,
            accepts_marketing_updated_at:
              args.data.accepts_marketing_updated_at,
            marketing_opt_in_level: args.data.marketing_opt_in_level,
            tax_exemptions: args.data.tax_exemptions,
            admin_graphql_api_id: args.data.admin_graphql_api_id,
          },
        })
      },
    })
  },
})

const Customer = objectType({
  name: 'Customer',
  definition(t) {
    t.int('id')
    t.string('email')
    t.string('accepts_marketing')
    t.string('created_at')
    t.string('updated_at')
    t.string('first_name')
    t.string('last_name')
    t.int('orders_count')
    t.string('state')
    t.int('total_spent')
    t.int('last_order_id')
    t.string('note')
    t.string('verified_email')
    t.string('multipass_identifier')
    t.string('tax_exempt')
    t.string('phone')
    t.string('tags')
    t.string('last_order_name')
    t.string('currency')
    t.string('accepts_marketing_updated_at')
    t.string('marketing_opt_in_level')
    t.string('tax_exemptions')
    t.string('admin_graphql_api_id')
  },
})

const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
})

const CustomerCreateInput = inputObjectType({
  name: 'CustomerCreateInput',
  definition(t) {
    t.int('id')
    t.string('email')
    t.string('accepts_marketing')
    t.string('created_at')
    t.string('updated_at')
    t.string('first_name')
    t.string('last_name')
    t.int('orders_count')
    t.string('state')
    t.int('total_spent')
    t.int('last_order_id')
    t.string('note')
    t.string('verified_email')
    t.string('multipass_identifier')
    t.string('tax_exempt')
    t.string('phone')
    t.string('tags')
    t.string('last_order_name')
    t.string('currency')
    t.string('accepts_marketing_updated_at')
    t.string('marketing_opt_in_level')
    t.string('tax_exemptions')
    t.string('admin_graphql_api_id')
  },
})

export const schema = makeSchema({
  types: [Query, Mutation, Customer, CustomerCreateInput, SortOrder, DateTime],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
