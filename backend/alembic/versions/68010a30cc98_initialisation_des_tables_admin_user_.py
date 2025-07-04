"""Initialisation des tables Admin, User, Consommation, Prediction, PointPredit, Arima, Sarima, LSTM

Revision ID: 68010a30cc98
Revises: 
Create Date: 2025-06-03 00:50:27.525752

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '68010a30cc98'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('admin',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('mdp', sa.String(), nullable=True),
    sa.Column('note', sa.String(), nullable=True),
    sa.Column('pdp', sa.String(), nullable=True),
    sa.Column('nom_entp', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('prediction',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('titre', sa.String(), nullable=True),
    sa.Column('period', sa.Integer(), nullable=True),
    sa.Column('date_cree', sa.Date(), nullable=True),
    sa.Column('typeC', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_prediction_id'), 'prediction', ['id'], unique=False)
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('mdp', sa.String(), nullable=True),
    sa.Column('note', sa.String(), nullable=True),
    sa.Column('pdp', sa.String(), nullable=True),
    sa.Column('code_client', sa.String(), nullable=False),
    sa.Column('nom', sa.String(), nullable=True),
    sa.Column('prenom', sa.String(), nullable=True),
    sa.Column('adresse', sa.String(), nullable=True),
    sa.Column('date_naissance', sa.Date(), nullable=True),
    sa.Column('telephone', sa.String(), nullable=True),
    sa.Column('typeC', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_code_client'), 'users', ['code_client'], unique=True)
    op.create_table('consommation',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('valeur', sa.Float(), nullable=True),
    sa.Column('date', sa.Date(), nullable=True),
    sa.Column('client_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['client_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_consommation_id'), 'consommation', ['id'], unique=False)
    op.create_table('point_predit',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('dateP', sa.Date(), nullable=True),
    sa.Column('valeur_predite', sa.Float(), nullable=True),
    sa.Column('prediction_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['prediction_id'], ['prediction.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_point_predit_id'), 'point_predit', ['id'], unique=False)
    op.create_table('sarima',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('mape', sa.Float(), nullable=True),
    sa.Column('p', sa.Integer(), nullable=True),
    sa.Column('d', sa.Integer(), nullable=True),
    sa.Column('q', sa.Integer(), nullable=True),
    sa.Column('s', sa.Integer(), nullable=True),
    sa.Column('P', sa.Integer(), nullable=True),
    sa.Column('D', sa.Integer(), nullable=True),
    sa.Column('Q', sa.Integer(), nullable=True),
    sa.Column('pred_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['pred_id'], ['prediction.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('pred_id')
    )
    op.create_index(op.f('ix_sarima_id'), 'sarima', ['id'], unique=False)
    op.create_unique_constraint(None, 'arima', ['pred_id'])
    op.create_foreign_key(None, 'arima', 'prediction', ['pred_id'], ['id'])
    op.create_foreign_key(None, 'lstm', 'prediction', ['pred_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'lstm', type_='foreignkey')
    op.drop_constraint(None, 'arima', type_='foreignkey')
    op.drop_constraint(None, 'arima', type_='unique')
    op.drop_index(op.f('ix_sarima_id'), table_name='sarima')
    op.drop_table('sarima')
    op.drop_index(op.f('ix_point_predit_id'), table_name='point_predit')
    op.drop_table('point_predit')
    op.drop_index(op.f('ix_consommation_id'), table_name='consommation')
    op.drop_table('consommation')
    op.drop_index(op.f('ix_users_code_client'), table_name='users')
    op.drop_table('users')
    op.drop_index(op.f('ix_prediction_id'), table_name='prediction')
    op.drop_table('prediction')
    op.drop_table('admin')
    # ### end Alembic commands ###
