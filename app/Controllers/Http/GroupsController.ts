import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Group from 'App/Models/Group'

export default class GroupsController {
  public async store({ request, response, auth }: HttpContextContract) {
    const groupPayload = request.all()

    const user = await auth.authenticate()

    const group = await Group.create({ master: user.id, ...groupPayload })

    await group.related('players').attach([user.id])

    await group.load('players')

    return response.created({ group: group })
  }

  public async addUserToGroup({ request, response }: HttpContextContract) {
    const { groupId, playerId } = request.only(['playerId', 'groupId'])

    const group = await Group.findByOrFail('id', groupId)

    console.log(group)

    await group.related('players').attach([playerId])

    await group.load('players')

    return response.created({ group: group })
  }

  public async destroyGroup({ params, response }: HttpContextContract) {
    const id = params.id

    const group = await Group.find(id)

    await group?.load('masterUser')
    await group?.load('players')

    const groupDeleted = group

    await group?.related('players').detach()

    return response.json({ deleted: groupDeleted })
  }
}
